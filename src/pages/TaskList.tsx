import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Col, Row, Stack} from 'react-bootstrap';
import {addDays, format, getWeek, subDays} from 'date-fns';
import {FaBackward, FaForward} from 'react-icons/fa';
import TaskCard from '../components/TaskCard';
import {Task} from "../models/Task";
import {deleteTaskFromIndexedDbById, loadTasksFromIndexedDb, saveTasksToIndexedDb} from "../db/tasksDb";
import {populateInitialData} from "../db/initializeDb";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const TaskList: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [triggerUpdate, setTriggerUpdate] = useState(0);

    const fetchTasks = useCallback(async () => {
        const loadedTasks = await loadTasksFromIndexedDb();
        console.log(`loadedTasks.length=${loadedTasks.length}`);
        setTasks(loadedTasks);
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks, triggerUpdate]);

    useEffect(() => {
        saveTasksToIndexedDb(tasks);
    }, [tasks]);

    const query = useQuery();
    const navigate = useNavigate();
    const dateParam = query.get('date');
    const date = useMemo(() => (dateParam ? new Date(dateParam) : new Date()), [dateParam]);
    const [currentDate, setCurrentDate] = useState(date);

    useEffect(() => {
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        navigate(`/tasks?date=${formattedDate}`, {replace: true});
    }, [currentDate, navigate]);

    const handlePreviousDay = useCallback(() => {
        setCurrentDate((prevDate) => subDays(prevDate, 1));
    }, []);

    const handleNextDay = useCallback(() => {
        setCurrentDate((prevDate) => addDays(prevDate, 1));
    }, []);

    const handleToday = useCallback(() => {
        setCurrentDate(new Date());
    }, []);

    const handleDelete = useCallback(
        async (id: number) => {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
            await deleteTaskFromIndexedDbById(id);
        },
        [tasks]
    );

    const handleReset = useCallback(async () => {
        await populateInitialData();
        setTriggerUpdate(prev => prev + 1); // Trigger re-fetch of tasks
    }, []);

    const [message, setMessage] = useState<string>('--');
    const handleUpload = useCallback(async () => {
        // Generate file content from code
        const jsonData = JSON.stringify({key: 'value', foo: 'bar'});

        // Create Blob objects from the content
        const jsonBlob = new Blob([jsonData], {type: 'application/json'});

        // Create File objects from Blobs
        const currentDate = formatDate(new Date());
        const fileName = `react-timesheet-pwa-backup-${currentDate}.json`;
        const jsonFile = new File([jsonBlob], fileName, {type: 'application/json'});

        // Array of files to share
        if (navigator.canShare) {
            if (navigator.canShare({files: [jsonFile]})) {
                navigator.share({
                    files: [jsonFile],
                    title: 'Export',
                })
                    .then(() => {
                        console.log('Files shared successfully');
                        setMessage('Files shared successfully');
                    })
                    .catch((error) => {
                        console.error('Error sharing files:', error);
                        setMessage('Error sharing files:');
                    });
            } else {
                console.error('Your system doesn\'t support sharing these files.');
                setMessage('Your system doesn\'t support sharing these files.');
            }
        } else {
            console.error('Your system doesn\'t support sharing files.');
            setMessage('Your system doesn\'t support sharing files.');
        }
    }, []);

    const header = `${format(currentDate, 'E dd.MM.yyyy')} W${getWeek(currentDate)}`;

    return (
        <Container fluid className="align-items-center justify-content-center mw-100">
            <Row className="mb-3 App-header">
                <Col className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" className="nav-button" onClick={handlePreviousDay}>
                        <FaBackward/>
                    </Button>
                    <Stack className="flex-grow-1 text-center mx-3">
                        <div className="w-100">
                            <h1 className="m-0">{header}</h1>
                        </div>
                        <Row xs={4} className="justify-content-center">
                            <Button variant="success" className="mt-2" onClick={handleToday}>
                                Today
                            </Button>
                        </Row>
                    </Stack>
                    <Button variant="primary" className="nav-button" onClick={handleNextDay}>
                        <FaForward/>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Stack direction="horizontal" gap={3}>
                    <Col className="w-75">
                        <Row className="mb-3">
                            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Row className="flex-fill">
                                    <Button>Check in now</Button>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Row className="flex-fill">
                                    <Button>Check out now</Button>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Row className="flex-fill">
                                    <Button onClick={handleUpload}>Backup</Button>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={3} xl={2}>
                                <Row className="flex-fill">
                                    <Button onClick={handleReset}>Reset IndexedDB</Button>
                                </Row>
                            </Col>
                        </Row>
                        <h2>{message}</h2>
                        <h2>Today's Tasks:</h2>
                        {tasks.map((task, index) => (
                            <TaskCard key={task.id} task={task} index={index} onDelete={handleDelete}/>
                        ))}
                    </Col>
                </Stack>
            </Row>
        </Container>
    );
};

const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};

export default TaskList;