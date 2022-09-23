import './Inside_Card_For_Body.css';
import { Card, Container } from 'react-bootstrap';
import { ThemeContextConsumer } from '../ThemeContext';
function CardForBody(props) {
    return (
        <ThemeContextConsumer>{context => (
            <Card className={context.theme + " " + context.theme + "ForInsideCardShadow " + " " +context.theme +"ForInsideCard  " + " InsideCardBody"}>
                <Container className={context.theme +" "+context.theme + "ForInsideCard  " + " textInsideForCard"}>{props.children}
            </Container>
        </Card>)}
        </ThemeContextConsumer>
    );
} export default CardForBody;