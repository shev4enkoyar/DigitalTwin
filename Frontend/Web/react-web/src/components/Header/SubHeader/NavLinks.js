import { Nav, Container } from 'react-bootstrap';
import '../Header.css';
import Vector_Icon from '../Vector_Icon';
import Profile_Icon from '../Profile_Icon';
import { ThemeContextConsumer, ThemeContextProvider } from "../../ThemeContext.js"
function NavLinks() {

    return (
        <ThemeContextConsumer>{
            context => (
                <Container id="nav_links" className={context.theme}>
                    <Nav.Link  className={context.theme + " navbar-brand"}>
                    </Nav.Link>
                    <Nav.Link  className={context.theme + " navbar-brand"}>
                    </Nav.Link>
                    <Vector_Icon />
                    <Profile_Icon />
                </Container>)}
        </ThemeContextConsumer>
    )
} export default NavLinks;