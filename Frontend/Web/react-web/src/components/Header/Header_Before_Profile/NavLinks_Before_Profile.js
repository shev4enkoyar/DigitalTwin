import {  Nav, Container } from 'react-bootstrap';
import '../Header.css';
import Vector_Icon from '../Vector_Icon';
import Profile_Icon from '../Profile_Icon';
import { ThemeContextConsumer, ThemeContextProvider } from "../../ThemeContext.js";
import { useState } from 'react';
import Bell_Icon from './Bell';
function NavLinks_For_Profile() {

    const [active, setActive] = useState(false);

    return (
        <ThemeContextConsumer>{ 
            context => (
        <Container id="nav_links" className={context.theme}>
                <Vector_Icon />
                <Bell_Icon/>
                    <Profile_Icon/>
                </Container>
            )}
            </ThemeContextConsumer>
        )
} export default NavLinks_For_Profile;