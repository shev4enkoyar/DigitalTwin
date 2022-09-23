import { Container } from 'react-bootstrap';
import './Footer.css';
import { ThemeContextConsumer } from "../ThemeContext.js"
function Footer() {
    return (
        <ThemeContextConsumer>{context => (
            <Container fluid id="Footer" className={context.theme + " footerShadow"}>
                <Container id='footer_Content' className={context.theme}>
                    <p className={context.theme} >Подвал</p>
                </Container>
            </Container>)}
                </ThemeContextConsumer>
        );
} export default Footer;