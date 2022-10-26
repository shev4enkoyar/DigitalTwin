import { Container } from 'react-bootstrap';
import './Footer.css';
import React from "react";
import { ThemeContextConsumer } from "../ThemeContext.js"
function Footer() {
    return (
        <ThemeContextConsumer>
            {context => (
                <footer className={context.theme +" footer"}>
                    <p className="text-center" >
                        Подвал
                    </p>
                </footer>
            )}
        </ThemeContextConsumer>
        );
} export default Footer;