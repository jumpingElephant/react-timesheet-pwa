import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Col, Row, Stack} from 'react-bootstrap';
import {addDays, format, getWeek, subDays} from 'date-fns';
import {FaBackward, FaForward} from 'react-icons/fa';
import TaskCard from '../components/TaskCard';
import {deleteTaskFromIndexedDbById, loadTasksFromIndexedDb, saveTasksToIndexedDb} from "../utils/indexedDB";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const loadedTasks = await loadTasksFromIndexedDb();
            console.log(`loadedTasks.length=${loadedTasks.length}`);
            setTasks(loadedTasks);
        };
        fetchTasks();
    }, []);

    // Save tasks to IndexedDB on change
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
        setCurrentDate(prevDate => subDays(prevDate, 1));
    }, []);

    const handleNextDay = useCallback(() => {
        setCurrentDate(prevDate => addDays(prevDate, 1));
    }, []);

    const handleToday = useCallback(() => {
        setCurrentDate(new Date());
    }, []);

    const handleDelete = useCallback(async (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        setTasks(updatedTasks);
        await deleteTaskFromIndexedDbById(id);
    }, [tasks]);

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
                            <Col xs={6} sm={6} md={4} lg={3}>
                                <Row className="flex-fill">
                                    <Button>Check in now</Button>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={3}>
                                <Row className="flex-fill">
                                    <Button>Check out now</Button>
                                </Row>
                            </Col>
                            <Col xs={6} sm={6} md={4} lg={3}>
                                <Row className="flex-fill">
                                    <Button>Switch Task</Button>
                                </Row>
                            </Col>
                        </Row>
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

export default TaskList;