import React from 'react';
import {Container, Navbar} from 'react-bootstrap';
import '../Header.css';
import NavLinksAuthorized from './NavLinksAuthorized.js';
import {ThemeContextConsumer} from "../../ThemeContext.js";

const NavbarAuthorized = () => (
    <ThemeContextConsumer>{context => (
        <Navbar
            className={context.theme + " " + context.theme + "Header" + " navbar  navbar-dark"}
            id="headerForHome" collapseOnSelect expand="lg" variant="dark">
            <Container id="menu">
                <Navbar.Brand href="/" className={context.theme + " navbar-brand"} id="DTwin-logo"/>
                <NavLinksAuthorized />
            </Container>
        </Navbar>)}
    </ThemeContextConsumer>
);

export default NavbarAuthorized;