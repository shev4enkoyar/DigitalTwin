import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import '../Header.css';
import NavLinks from './NavLinks.js';
import { ThemeContextConsumer } from "../../ThemeContext.js"
export default class Header extends Component {

    render() {

        return (
            <ThemeContextConsumer>{context => (
                <Navbar className={context.theme + " " + context.theme + "Header" + " navbar navbar-expand-lg navbar-dark sticky-top"} id="headerForHome" collapseOnSelect expand="lg" variant="dark">
                    <Container id="menu">
                        <Navbar.Brand href="/" className={context.theme + " navbar-brand"} id="DTwin-logo" />
                        <NavLinks>
                        </NavLinks>
                    </Container>
                </Navbar>)}
            </ThemeContextConsumer>
        )
    }
};