import {  Container } from 'react-bootstrap';
import '../Header.css';
import VectorIcon from '../VectorIcon';
import ProfileIcon from '../ProfileIcon';
import { ThemeContextConsumer, ThemeContextProvider } from "../../ThemeContext.js";
import { useState } from 'react';
import BellIcon from './Bell';
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
                    <VectorIcon />
                    <BellIcon/>
                    <button style={{border: "none", padding: 0, background: "transparent"}} onClick={() => { setActive(true) }}>
                        <ProfileIcon/>
                    </button>
                    <ProfilePopUp isActive={isActive} handleActiveChange={handleActiveChange}/>
                </Container>
            )}
        </ThemeContextConsumer>
        )
}

export default NavLinksAuthorized;