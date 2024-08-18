import React, {useState} from 'react';
import './App.css';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ThemeProvider from "react-bootstrap/ThemeProvider";
import {Col, Row, Stack} from "react-bootstrap";
import {format, getWeek} from 'date-fns';
import {FaBackward, FaForward} from 'react-icons/fa';

const ExampleToast = ({children}) => {
    const [show, toggleShow] = useState(true);

    return (
        <>
            {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
            <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">React-Bootstrap</strong>
                </Toast.Header>
                <Toast.Body>{children}</Toast.Body>
            </Toast>
        </>
    );
};

const App = () => {
    const date = new Date();
    const [header, setHeader] = useState(`${format(date, "E dd.MM.yyyy")} W${getWeek(date)}`);
    return (
        <ThemeProvider
            breakpoints={['xxl', 'xl', 'lg', 'md', 'sm', 'xs']}
            minBreakpoint="xs"
        >
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
        </ThemeProvider>
    )
};

export default App;
