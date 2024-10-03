import React, {useState} from 'react';
import {Container, Image, Nav, Navbar as BootstrapNavbar, Offcanvas} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Navbar: React.FC = () => {
    const isGitHubPages = window.location.hostname === "<username>.github.io";
    const imagePath = isGitHubPages ? "img/timesheet-icon-transparent.png" : process.env.PUBLIC_URL + '/img/timesheet-icon-transparent.png';

    // State to control Offcanvas visibility
    const [show, setShow] = useState(false);

    // Handlers to show and hide Offcanvas
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <BootstrapNavbar expand={false} className="bg-body-tertiary" sticky="top">
                <Container>
                    <BootstrapNavbar.Brand as={Link} to="/">
                        <Image
                            alt=""
                            src={imagePath}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        Timesheet
                    </BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow}/>
                    <BootstrapNavbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel"
                                               placement="end" show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Timesheet</Offcanvas.Title>
                            <Offcanvas.Header>v{process.env.REACT_APP_VERSION}</Offcanvas.Header>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/tasks" onClick={handleClose}>Tasks</Nav.Link>
                                <Nav.Link as={Link} to="/projects" onClick={handleClose}>Projects</Nav.Link>
                                <Nav.Link as={Link} to="/about" onClick={handleClose}>About</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </BootstrapNavbar.Offcanvas>
                </Container>
            </BootstrapNavbar>
        </>
    );
};

export default Navbar;