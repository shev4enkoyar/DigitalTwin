import {  Container } from 'react-bootstrap';
import '../Header.css';
import Vector_Icon from '../Vector_Icon';
import Profile_Icon from '../Profile_Icon';
import { ThemeContextConsumer, ThemeContextProvider } from "../../ThemeContext.js";
import { useState } from 'react';
import Bell_Icon from './Bell';
import ProfilePopUp from "../../../pages/Modal/profile/ProfilePopUp";
const NavLinksAuthorized = () => {

    const [isActive, setActive] = useState(false);
    const handleActiveChange = () => {
        setActive(!isActive);
    }
    return (
        <ThemeContextConsumer>{ 
            context => (
                <Container id="nav_links" className={context.theme}>
                    <Vector_Icon />
                    <Bell_Icon/>
                    <button style={{border: "none", padding: 0, background: "transparent"}} onClick={() => { setActive(true) }}>
                        <Profile_Icon/>
                    </button>
                    <ProfilePopUp isActive={isActive} handleActiveChange={handleActiveChange}/>
                </Container>
            )}
        </ThemeContextConsumer>
        )
}

export default NavLinksAuthorized;