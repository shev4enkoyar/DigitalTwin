import React from 'react';
import {Container, Navbar} from 'react-bootstrap';
import '../Header.css';
import NavLinks_Before_Profile from './NavLinksAuthorized.js';
import {ThemeContextConsumer} from "../../ThemeContext.js";

const NavbarAuthorized = () => (
    <ThemeContextConsumer>{context => (
        <Navbar
            className={context.theme + " " + context.theme + "Header" + " navbar navbar-expand-lg navbar-dark sticky-top"}
            id="headerForHome" collapseOnSelect expand="lg" variant="dark">
            <Container id="menu">
                <Navbar.Brand href="/" className={context.theme + " navbar-brand"} id="DTwin-logo"/>
                <NavLinks_Before_Profile/>
            </Container>
        </Navbar>)}
    </ThemeContextConsumer>
);

export default NavbarAuthorized;