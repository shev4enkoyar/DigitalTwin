import {  Nav, Container } from 'react-bootstrap';
import '../Header.css';
import VectorIcon from '../VectorIcon';
import ProfileIcon from '../ProfileIcon';
import { ThemeContextConsumer, ThemeContextProvider } from "../../ThemeContext.js";
import { useState } from 'react';
import BellIcon from './../navbar/Bell';
import ProfilePopUp from '../../../pages/Modal/profile/ProfilePopUp';
function NavLinks_For_Profile(props) {

    const [isActive, setActive] = useState(false);
    const handleActiveChange = () => {
        setActive(!isActive);
    }
    return (
        <ThemeContextConsumer>{ 
            context => (
        <Container id="nav_links" className={context.theme+"Gray "}>
                    <VectorIcon Gray={true} />
                    <BellIcon Gray={true} />
                    <button style={{ border: "none", padding: 0, background: "transparent" }} onClick={() => { setActive(true) }}>
                        <ProfileIcon Gray={true} />
                    </button>
                    <ProfilePopUp isActive={isActive} handleActiveChange={handleActiveChange} />
                </Container>
            )}
            </ThemeContextConsumer>
        )
} export default NavLinks_For_Profile;