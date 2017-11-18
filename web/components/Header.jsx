import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, Form, FormGroup, ControlLabel,
    FormControl, Button, Image, NavItem } from 'react-bootstrap/lib';

/**
 * Navigation component of the application.
 */
class Header extends Component {
    state = {
        width: window.innerWidth,
        expanded: false,
    }

    getWidth = () => this.setState({ width: window.innerWidth });

    componentDidMount = () => window.addEventListener("resize", this.getWidth);

    onSignOut = () => this.props.onSignOut();

    // Needed for small width, as we want to collapse the nav on sign in.
    onToggle = (isExpanded) => this.setState({ expanded: isExpanded });

    getContent = () => {
        const { isLoginView } = this.props;
        const { width } = this.state;
        if (isLoginView) {
            const buttonStyle = {
                display: width > 768 ? 'block' : 'none',
            }
            const linkStyle = {
                display: width > 768 ? 'none' : 'block',
            }
            return (
                <Navbar.Collapse>
                    <div style={buttonStyle}>
                        <Navbar.Form pullRight>
                            <div id="kb-signin-small"/>
                        </Navbar.Form>
                    </div>
                    <div style={linkStyle}>
                        <Nav>
                            <NavItem>
                                <div id='collapsed-sign-in'>
                                    Sign in
                                </div>
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            )
        }
        return (
            <Navbar.Collapse>
                <Nav pullRight>
                    {width > 768 ?
                    (<NavDropdown
                        title={
                            <Image
                                id='user-image'
                                src={this.props.userImage}
                                circle
                            />}
                        noCaret id="dropdown-no-caret">
                        <MenuItem href="#" onSelect={this.onSignOut}>
                            Sign out
                        </MenuItem>
                    </NavDropdown>) :
                    (<NavItem href="#" onSelect={this.onSignOut}>
                        Sign out
                    </NavItem>)}
                </Nav>
            </Navbar.Collapse>
        )
    }

    render() {
        return (
            <Navbar
                collapseOnSelect
                expanded={this.state.expanded}
                onToggle={this.onToggle}
            >
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#">Knowledge Base</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                {this.getContent()}
            </Navbar>
        );
    }
}

export default Header;
