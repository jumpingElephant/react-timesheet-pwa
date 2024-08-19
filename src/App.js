import React, {useState} from 'react';
import './App.css';
import {BrowserRouter as Router, Link, Route, Routes, useLocation} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ThemeProvider from "react-bootstrap/ThemeProvider";
import {Col, Row, Stack} from "react-bootstrap";
import {format, getWeek} from 'date-fns';
import {FaBackward, FaForward} from 'react-icons/fa';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const query = useQuery();
    const dateParam = query.get('date');
    const date = dateParam ? new Date(dateParam) : new Date();
    const [header, setHeader] = useState(`${format(date, "E dd.MM.yyyy")} W${getWeek(date)}`);

    return (
        <Container fluid className="align-items-center justify-content-center mw-100">
            <Row>
                <Stack direction="horizontal" gap={3} className="App-header">
                    <div className="flex-start"><Button><FaBackward/></Button></div>
                    <div className="text-center flex-grow-1"><h1>{header}</h1></div>
                    <div className="flex-end"><Button><FaForward/></Button></div>
                </Stack>
            </Row>
            <Row>
                <Stack direction="horizontal" gap={3}>
                    <Col className="w-75">
                        <Row>
                            <Col xs={6} sm={6} md={4} lg={3}><Row className="flex-fill"><Button>Check in
                                now</Button></Row></Col>
                            <Col xs={6} sm={6} md={4} lg={3}><Row className="flex-fill"><Button>Check out
                                now</Button></Row></Col>
                            <Col xs={6} sm={6} md={4} lg={3}><Row className="flex-fill"><Button>Switch
                                Task</Button></Row></Col>
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