import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import {Col, Row, Stack} from 'react-bootstrap';
import {addDays, format, getWeek, subDays} from 'date-fns';
import {FaBackward, FaForward} from 'react-icons/fa';
import TaskCard from '../components/TaskCard';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const initialTasks = [
    {id: 1, title: 'Task 1', start: new Date('2023-10-01T08:00:00'), end: new Date('2023-10-01T10:00:00')},
    {id: 2, title: 'Task 2', start: new Date('2023-10-01T11:00:00'), end: new Date('2023-10-01T12:00:00')},
    {id: 3, title: 'Task 3', start: new Date('2023-10-01T13:00:00'), end: new Date('2023-10-01T15:00:00')},
];

const Home = () => {
    const query = useQuery();
    const navigate = useNavigate();
    const dateParam = query.get('date');
    const date = useMemo(() => (dateParam ? new Date(dateParam) : new Date()), [dateParam]);
    const [currentDate, setCurrentDate] = useState(date);
    const [tasks, setTasks] = useState(initialTasks);

    useEffect(() => {
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        navigate(`/?date=${formattedDate}`, {replace: true});
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

    const handleDelete = useCallback(id => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
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

export default Home;