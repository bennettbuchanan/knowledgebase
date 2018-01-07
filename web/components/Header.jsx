import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, Form, FormGroup, ControlLabel,
    FormControl, Button, Image, NavItem } from 'react-bootstrap/lib';
import cylinder from '../assets/cylinder.png';

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

    onUpdateProfile = () => this.props.onUpdateProfile();

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
                {width > 768 ? (
                <Nav pullRight>
                    <NavDropdown
                        title={
                            <Image
                                id='user-image'
                                src={this.props.userImage}
                                circle
                            />}
                        noCaret id="dropdown-no-caret">
                        <MenuItem href="" onSelect={this.onUpdateProfile}>
                            Profile
                        </MenuItem>
                        <MenuItem href="" onSelect={this.onSignOut}>
                            Sign out
                        </MenuItem>
                    </NavDropdown>
                </Nav>) :
                (<Nav pullRight>
                    <NavItem href="" onSelect={this.onUpdateProfile}>
                        Profile
                    </NavItem>
                    <NavItem href="" onSelect={this.onSignOut}>
                        Sign out
                    </NavItem>
                </Nav>)}
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
                        <div style={{paddingTop: '8px', display: 'flex'}}>
                            <a href="">
                                <img id='header-icon'
                                    src={cylinder}
                                    alt="cylinder"
                                />
                            </a>
                            <a id='header-text' href="">knowledgebase</a>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                {this.getContent()}
            </Navbar>
        );
    }
}

export default Header;
