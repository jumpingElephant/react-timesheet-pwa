import React, {useCallback, useEffect, useMemo, useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ThemeProvider from "react-bootstrap/ThemeProvider";
import {Col, Nav, Navbar, NavDropdown, Row, Stack} from "react-bootstrap";
import {addDays, format, getWeek, subDays} from 'date-fns';
import {FaBackward, FaForward} from 'react-icons/fa';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const query = useQuery();
    const navigate = useNavigate();

    const dateParam = query.get('date');
    const date = useMemo(() => dateParam ? new Date(dateParam) : new Date(), [dateParam]);

    const [currentDate, setCurrentDate] = useState(date);

    useEffect(() => {
        const formattedDate = format(currentDate, "yyyy-MM-dd");
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

    const header = `${format(currentDate, "E dd.MM.yyyy")} W${getWeek(currentDate)}`;

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
                        <Row xs={4} className="justify-content-center"><Button variant="success" className="mt-2"
                                                                               onClick={handleToday}>Today</Button></Row>
                    </Stack>
                    <Button variant="primary" className="nav-button" onClick={handleNextDay}>
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
                                        <NavDropdown.Item href="#action/3.2">
                                            Another action
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                        <NavDropdown.Divider/>
                                        <NavDropdown.Item href="#action/3.4">
                                            Separated link
                                        </NavDropdown.Item>
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