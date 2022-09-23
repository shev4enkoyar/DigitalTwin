import './DarkCardForHome.css';
import { Card, Container } from 'react-bootstrap';
import { ThemeContextConsumer } from "../../ThemeContext";
function DarkCardForHome(props) {
    return (
        <ThemeContextConsumer>{context => (
            <Card className={props.lightGray + " " + (props.lightGray === "" ? context.theme : "") + " darkCard " +
                (context.theme === "light" ? context.theme +"BorderForCard" : "")} >
                <Container className={context.theme + " textForCardDark"}>{props.contentForHome}
                </Container>
            </Card>)}
            </ThemeContextConsumer>
        );
} export default DarkCardForHome;