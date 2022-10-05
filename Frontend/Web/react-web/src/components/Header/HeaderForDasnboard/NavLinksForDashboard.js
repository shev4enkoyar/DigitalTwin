import {  Nav, Container } from 'react-bootstrap';
import '../Header.css';
import VectorIcon from '../VectorIcon';
import ProfileIcon from '../ProfileIcon';
import { ThemeContextConsumer, ThemeContextProvider } from "../../ThemeContext.js";
import { useState } from 'react';
import BellIcon from './../navbar/Bell';
function NavLinks_For_Profile() {

    const [active, setActive] = useState(false);

    return (
        <ThemeContextConsumer>{ 
            context => (
        <Container id="nav_links" className={context.theme+"Gray "}>
                    <VectorIcon Gray={true} />
                    <BellIcon Gray={true} />
                    <ProfileIcon Gray={true} />
                </Container>
            )}
            </ThemeContextConsumer>
        )
} export default NavLinks_For_Profile;