import {  Nav, Container } from 'react-bootstrap';
import '../Header.css';
import Vector_Icon from '../Vector_Icon';
import Profile_Icon from '../Profile_Icon';
import { ThemeContextConsumer, ThemeContextProvider } from "../../ThemeContext.js";
import { useState } from 'react';
import Bell_Icon from './../navbar/Bell';
function NavLinks_For_Profile() {

    const [active, setActive] = useState(false);

    return (
        <ThemeContextConsumer>{ 
            context => (
        <Container id="nav_links" className={context.theme+"Gray "}>
                    <Vector_Icon Gray={true} />
                    <Bell_Icon Gray={true} />
                    <Profile_Icon Gray={true} />
                </Container>
            )}
            </ThemeContextConsumer>
        )
} export default NavLinks_For_Profile;