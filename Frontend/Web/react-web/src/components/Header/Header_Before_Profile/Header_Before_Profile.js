import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import '../Header.css';
import NavLinks_Before_Profile from './NavLinks_Before_Profile.js';
import { ThemeContextConsumer } from "../../ThemeContext.js";
export default class Header_Before_Profile extends Component {
    
    render() {
        
        return (
            <ThemeContextConsumer>{context => (
                <Navbar className={context.theme+ " "+context.theme + "Header"+" navbar navbar-expand-lg navbar-dark sticky-top"} id="headerForHome" collapseOnSelect expand="lg" variant="dark">
                    <Container id="menu">
                        <Navbar.Brand href="/" className={context.theme + " navbar-brand"} id="DTwin-logo" />
                        <NavLinks_Before_Profile/>
                    </Container>
                </Navbar>)}
           </ThemeContextConsumer>
        )
    }
};