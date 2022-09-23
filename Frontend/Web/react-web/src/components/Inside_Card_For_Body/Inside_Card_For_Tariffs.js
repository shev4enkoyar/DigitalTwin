import './Inside_Card_For_Body.css';
import { Card, Container,Col } from 'react-bootstrap';
import { ThemeContextConsumer } from '../ThemeContext';
import ButtonCross from '../Button/ButtonCross';
import UpdateTag from '../Button/UpdateTag';
function CardForTariffs(props) { 
    return (
        <ThemeContextConsumer>{context => (
            
            <Card className={context.theme + "ForInsideCard" + " InsideCardTarriffs "}>
                        <Container className={context.theme + " " + context.theme + "ForInsideCard" + " textInsideForCardTarriffs"}>{props.children}
                    <Col style={{ margin: '0% 6% 0% 0%' }}> <p style={{ margin: '0px', lineHeight: '15px' }} >{props.AddCancel}</p></Col><ButtonCross /><UpdateTag />
                        </Container>
                    </Card>)
            }
        </ThemeContextConsumer>
    );
} export default CardForTariffs;