import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap/lib';

/**
 * Navigation component of the application.
 */
class Header extends Component {
    render() {
        return (
            <Navbar collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Knowledgebase</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                {this.props.isLoginView ? (
                <Navbar.Collapse>
                    <Navbar.Form pullRight>
                        <Form inline>
                            <FormGroup controlId="formInlineName">
                                <ControlLabel>Email</ControlLabel>
                                {' '}
                                <FormControl type="text" />
                            </FormGroup>
                            {' '}
                            <FormGroup controlId="formInlineEmail">
                                <ControlLabel>Password</ControlLabel>
                                {' '}
                                <FormControl type="email" />
                            </FormGroup>
                            {' '}
                            <Button type="submit">
                                {'Log in'}
                            </Button>
                        </Form>
                    </Navbar.Form>
                </Navbar.Collapse>
                ) : (
                <Navbar.Collapse>
                    <Nav pullRight>
                        <NavDropdown title="Username" id="basic-nav-dropdown">
                            <MenuItem>Action</MenuItem>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>)
                }
            </Navbar>
        );
    }
}

export default Header;
