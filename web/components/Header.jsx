import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem } from 'react-bootstrap/lib';

/**
 * Navigation component of the application.
 */
function Header() {
    return (
        <Navbar collapseOnSelect>
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Knowledgebase</a>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavDropdown title="Username" id="basic-nav-dropdown">
                          <MenuItem>Action</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
