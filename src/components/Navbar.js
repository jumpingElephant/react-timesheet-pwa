import React from 'react';
import {Container, Nav, Navbar as BootstrapNavbar, NavDropdown, Offcanvas} from 'react-bootstrap';
import {initializeObjectStoresInIndexedDb} from "../utils/indexedDB";

const Navbar = () => {
    // noinspection HtmlUnknownTarget
    return (
        <>
            <BootstrapNavbar expand={false} className="bg-body-tertiary" sticky="top">
                <Container>
                    <BootstrapNavbar.Brand href="#home">Timesheet</BootstrapNavbar.Brand>
                    <BootstrapNavbar.Toggle aria-controls="offcanvasNavbar"/>
                    <BootstrapNavbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">Tasks</Nav.Link>
                                <Nav.Link href="/projects">Projects</Nav.Link>
                                <Nav.Link href="/about">About</Nav.Link>
                                <Nav.Link onClick={() => {
                                    initializeObjectStoresInIndexedDb();
                                    window.location.reload();
                                }}>Reset IndexedDB</Nav.Link>
                                <NavDropdown title="Dropdown" id="offcanvasNavbarDropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                    </BootstrapNavbar.Offcanvas>
                </Container>
            </BootstrapNavbar>
        </>
    );
};

export default Navbar;