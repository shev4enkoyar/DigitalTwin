import React from "react";
import { ThemeContextConsumer } from "../ThemeContext.js";
import './Footer.css';
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