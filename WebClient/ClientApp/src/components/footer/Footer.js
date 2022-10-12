import { Container } from 'react-bootstrap';
import './Footer.css';
import React from "react";
import { ThemeContextConsumer } from "../ThemeContext.js"
function Footer() {
    return (
        <ThemeContextConsumer>
            {context => (
                <Container className="footer" fluid>
                    <p className="text-center" >
                        Подвал
                    </p>
                </Container>
            )}
        </ThemeContextConsumer>
        );
} export default Footer;