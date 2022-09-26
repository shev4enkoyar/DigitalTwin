import React, { Component } from 'react';
import { Navbar, Container} from 'react-bootstrap';
import '../Header.css';
import NavLinksHome from './NavLinksHome.js';
import { ThemeContextConsumer } from "../../ThemeContext.js"
function NavbarHome(props){
    
        return (
            <ThemeContextConsumer>{context => (
                <Navbar className={context.theme+ " " + context.theme + "NavbarHome"+" navbar navbar-expand-lg navbar-dark sticky-top"} id="headerForHome" collapseOnSelect expand="lg" variant="dark">
                    <Container id="menu">
                        <Navbar.Brand href="/" className={context.theme + " navbar-brand"} id="DTwin-logo" />
                        <NavLinksHome handleAuthorizedChanged={props.handleAuthorizedChanged} isAuthorized={props.isAuthorized}>
                        </NavLinksHome>
                    </Container>
                </Navbar>)}
           </ThemeContextConsumer>
        )
} export default NavbarHome;