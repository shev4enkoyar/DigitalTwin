import {Nav, Container} from 'react-bootstrap';
import '../Header.css';
import Vector_Icon from '../Vector_Icon';
import Profile_Icon from '../Profile_Icon';
import { ThemeContextConsumer, ThemeContextProvider } from "../../ThemeContext.js"
import LogInPopUp from '../../../pages/Modal/login/LogInPopUp';
import { useState } from 'react';
import { ModalContextConsumer } from '../../../pages/Modal/ModalContext';
import ProfilePopUp from "../../../pages/Modal/profile/ProfilePopUp";
const NavLinksHome = (props) => {
    const [isActive, setActive] = useState(false);
    const handleActiveChange = () => {
        setActive(!isActive);
    }
    const RenderOnProfileClick = () => {
        if (props.isAuthorized)
            return <ProfilePopUp isActive={isActive} handleActiveChange={handleActiveChange}/>
        else
            return <LogInPopUp handleAuthorizedChanged={props.handleAuthorizedChanged} handleActiveChange={handleActiveChange} isActive={isActive}/>
    }

    /*const RenderIfHome = () => {
        if (document.getElementById('aboutUs') !== null)
    }*/
    return (
            <ThemeContextConsumer>
                {
                    context => (
                        <Container id="nav_links" className={context.theme}>
                            <Nav.Link href="#aboutUs" className={ context.theme + " navbar-brand"}>
                                О нас
                            </Nav.Link>
                            <Nav.Link href="#tariffs" className={context.theme + " navbar-brand"}>
                                Тарифы
                            </Nav.Link>
                            <Vector_Icon />
                            <button style={{border: "none", padding: 0, background: "transparent"}} onClick={() => { setActive(true) }}>
                                <Profile_Icon />
                            </button>
                            <RenderOnProfileClick />
                        </Container>
                    )
                }
            </ThemeContextConsumer>
    )
}

export default NavLinksHome;