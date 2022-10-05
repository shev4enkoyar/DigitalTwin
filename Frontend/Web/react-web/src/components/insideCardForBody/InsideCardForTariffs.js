import './InsideCardForBody.css';
import { Card, Container,Col } from 'react-bootstrap';
import { ThemeContextConsumer } from '../ThemeContext';
import cross_icon from './../data/cross-circle-svgrepo-com.svg';
import update_tag from './../data/updatetag1.svg';
import ButtonEdit from '../button/ButtonEdit';
function CardForTariffs(props) { 
    return (
        <ThemeContextConsumer>
            {context => (
                <Card className={context.theme + "ForInsideCard" + " InsideCardTarriffs "}>
                    <Container className={context.theme + " " + context.theme + "ForInsideCard" + " textInsideForCardTarriffs"}>{props.children}
                        <Col style={{ margin: '0% 6% 0% 0%' }}>
                            <p style={{ margin: '0px', lineHeight: '15px' }} >
                                {props.AddCancel}
                            </p>
                        </Col>
                        <ButtonEdit className="redBut ButAllMini" image={cross_icon} imageClassName="icon_for_but" />
                        <ButtonEdit className="greenBut ButAllMini" image={update_tag} imageClassName="icon_for_but"/>
                    </Container>
                </Card>
            )
            }
        </ThemeContextConsumer>
    );
} export default CardForTariffs;