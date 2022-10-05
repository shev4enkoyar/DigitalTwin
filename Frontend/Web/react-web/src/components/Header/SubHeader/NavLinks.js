import { Nav, Container } from 'react-bootstrap';
import '../Header.css';
import VectorIcon from '../VectorIcon';
import ProfileIcon from '../ProfileIcon';
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
                    <VectorIcon />
                    <ProfileIcon />
                </Container>)}
        </ThemeContextConsumer>
    )
} export default NavLinks;