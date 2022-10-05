import React, { Component } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import '../Header.css';
import NavLinksForDashboard from './NavLinksForDashboard.js';
import { ThemeContextConsumer } from "../../ThemeContext.js";
export default class HeaderForDashboard extends Component {
    
    render() {
        
        return (
            <ThemeContextConsumer>{context => (
                <Navbar className={context.theme + "Gray " + "Header" + " navbar navbar-expand-lg navbar-dark"} id="hForModels" collapseOnSelect expand="lg" variant="dark">
                    <div id="menu1">
                        <Navbar.Brand href="/" className={context.theme + "Gray navbar-brandForD"} id="ModelLogo" />
                        <NavLinksForDashboard/>
                    </div>
                </Navbar>)}
           </ThemeContextConsumer>
        )
    }
};