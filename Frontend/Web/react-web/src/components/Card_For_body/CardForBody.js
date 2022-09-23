import './CardForBody.css';
import { Card, Container } from 'react-bootstrap';
import { ThemeContextConsumer } from '../ThemeContext';
function CardForBody(props) {
    return (
        <ThemeContextConsumer>{context => (
            <Card onClick={props.onClick} className={(props.active? "modal_cont active ":"modal_cont ")+ context.theme + " CardBodyDark" }>
                <Container className={context.theme + " textForCardDark"}>{props.children}
            </Container>
        </Card>)}
            </ThemeContextConsumer>

    );
} export default CardForBody;