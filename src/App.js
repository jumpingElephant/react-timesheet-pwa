import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ThemeProvider from "react-bootstrap/ThemeProvider";
import {Col, Row, Stack} from "react-bootstrap";
import {addDays, format, getWeek, subDays} from 'date-fns';
import {FaBackward, FaForward} from 'react-icons/fa';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const query = useQuery();
    const navigate = useNavigate();

    const dateParam = query.get('date');
    const date = useMemo(() => (dateParam ? new Date(dateParam) : new Date()), [dateParam]);

    const [currentDate, setCurrentDate] = useState(date);

    useEffect(() => {
        const formattedDate = format(currentDate, 'yyyy-MM-dd');
        navigate(`/?date=${formattedDate}`, {replace: true});
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

    const header = `${format(currentDate, 'E dd.MM.yyyy')} W${getWeek(currentDate)}`;

    return (
        <Container fluid className="align-items-center justify-content-center mw-100">
            <Row className="mb-3 App-header">
                <Col className="d-flex justify-content-between align-items-center">
                    <Button variant="primary" onClick={handlePreviousDay}>
                        <FaBackward/>
                    </Button>
                    <div className="d-flex flex-column align-items-center mx-3">
                        <h1 className="m-0 text-nowrap">{header}</h1>
                        <Button
                            variant="success"
                            className="mt-2"
                            onClick={handleToday}
                        >
                            Today
                        </Button>
                    </div>
                    <Button variant="primary" onClick={handleNextDay}>
                        <FaForward/>
                    </Button>
                </Col>
            </Row>
            <Row>
                <Stack direction="horizontal" gap={3}>
                    <Col className="w-75">
                        <Row>
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
        <ThemeProvider
            breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
            minBreakpoint="xs"
        >
            <Router>
                <Container fluid className="align-items-center justify-content-center mw-100">
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                        </ul>
                    </nav>
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