import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {useSwipeable} from 'react-swipeable';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ThemeProvider from 'react-bootstrap/ThemeProvider';
import {Card, Col, Nav, Navbar, NavDropdown, Row, Stack} from 'react-bootstrap';
import {addDays, format, getWeek, subDays} from 'date-fns';
import {FaBackward, FaForward} from 'react-icons/fa';
import './App.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const initialTasks = [
    {id: 1, title: 'Task 1', start: new Date('2023-10-01T08:00:00'), end: new Date('2023-10-01T10:00:00')},
    {id: 2, title: 'Task 2', start: new Date('2023-10-01T11:00:00'), end: new Date('2023-10-01T12:00:00')},
    {id: 3, title: 'Task 3', start: new Date('2023-10-01T13:00:00'), end: new Date('2023-10-01T15:00:00')},
];

const TaskCard = ({task, index, onDelete}) => {
    const [isSwiping, setIsSwiping] = useState(false);
    const [isDeletionReady, setDeletionReady] = useState(false);
    const [swipeDistance, setSwipeDistance] = useState(0);

    const minSwipeDistance = 128; // Minimum swipe distance in pixels

    const swipeHandlers = useSwipeable({
        onSwiping: (eventData) => {
            eventData.event.preventDefault(); // Prevent scrolling
            setIsSwiping(true);
            setSwipeDistance(eventData.deltaX);
            setDeletionReady(Math.abs(eventData.deltaX) >= minSwipeDistance);
        },
        onSwiped: (eventData) => {
            if (Math.abs(swipeDistance) >= minSwipeDistance) {
                onDelete(task.id);
            }
            setIsSwiping(false);
            setSwipeDistance(0);
            setDeletionReady(false);
        },
        onTouchStartOrOnMouseDown: (eventData) => {
            eventData.event.preventDefault(); // Prevent scrolling
            setIsSwiping(true);
        },
        onTouchEndOrOnMouseUp: (eventData) => {
            eventData.event.preventDefault(); // Prevent scrolling
            setIsSwiping(false);
            setSwipeDistance(0);
            setDeletionReady(false);
        },
        preventScrollOnSwipe: true,
        preventDefaultTouchmoveEvent: true,
        trackMouse: false,
        swipeDuration: 2000,
        delta: minSwipeDistance,
    });

    return (
        <Card
            {...swipeHandlers}
            className={`mb-1 card-hover border-hover 
                ${isDeletionReady ? 'bg-danger' : (index % 2 === 0 ? 'bg-light' : '')}
                ${isSwiping ? 'swiping' : ''}`}
            style={{transform: `translateX(${swipeDistance}px)`}}
        >
            <Card.Body>
                <Card.Title>{task.title}</Card.Title>
                <Row className="align-items-center">
                    <Col>
                        <strong>Start:</strong> {format(task.start, 'Pp')}
                    </Col>
                    <Col>
                        <strong>End:</strong> {format(task.end, 'Pp')}
                    </Col>
                    <Col className="text-end">
                        <Button variant="primary" className="me-2">
                            Edit
                        </Button>
                        <Button variant="danger" onClick={() => onDelete(task.id)}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

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

const About = () => (
    <div>
        <h2>About</h2>
        <p>This is the about page.</p>
    </div>
);

const App = () => {
    return (
        <ThemeProvider breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs']} minBreakpoint="xs">
            <Router>
                <Container fluid className="align-items-center justify-content-center mw-100">
                    <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
                        <Container>
                            <Navbar.Brand href="#home">Timesheet</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <Nav.Link href="/">Home</Nav.Link>
                                    <Nav.Link href="/about">About</Nav.Link>
                                    <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/about" element={<About/>}/>
                    </Routes>
                </Container>
            </Router>
        </ThemeProvider>
    );
};

export default App;