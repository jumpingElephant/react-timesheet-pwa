import React from 'react';
import {Container, Nav, Navbar as BootstrapNavbar, NavDropdown} from 'react-bootstrap';

const Navbar = () => (
    <BootstrapNavbar expand="lg" className="bg-body-tertiary" sticky="top">
        <Container>
            <BootstrapNavbar.Brand href="#home">Timesheet</BootstrapNavbar.Brand>
            <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav"/>
            <BootstrapNavbar.Collapse id="basic-navbar-nav">
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
            </BootstrapNavbar.Collapse>
        </Container>
    </BootstrapNavbar>
);

export default Navbar;