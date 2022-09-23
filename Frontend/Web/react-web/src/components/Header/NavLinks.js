import {Nav, Container} from 'react-bootstrap';
import './Header.css';
import Vector_Icon from './Vector_Icon';
import Profile_Icon from './Profile_Icon';
import { ThemeContextConsumer, ThemeContextProvider } from "../ThemeContext.js"
import LogInPopUp from '../../pages/Modal/LogInPopUp';
import { useState } from 'react';
import { ModalContextConsumer } from '../../pages/Modal/ModalContext';
function NavLinks(props) {
    const [isActive, setActive] = useState(false);
    const handleActiveChange = () => {
        setActive(!isActive);
    }
    return (
            <ThemeContextConsumer>
                {
                    context => (
                        <Container id="nav_links" className={context.theme}>
                            <Nav.Link href="/profile" className={ context.theme + " navbar-brand"}>
                                О нас
                            </Nav.Link>
                            <Nav.Link href="/tariffs" className={context.theme + " navbar-brand"}>
                                Тарифы
                            </Nav.Link>
                            <Vector_Icon />
                            <button onClick={() => { setActive(true) }}>
                                <Profile_Icon />
                            </button>
                            <LogInPopUp handleActiveChange={handleActiveChange} isActive={isActive}/>
                        </Container>
                    )
                }
            </ThemeContextConsumer>
    )
} export default NavLinks;