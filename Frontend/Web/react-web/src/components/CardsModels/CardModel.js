import './CardModels.css';
import { Row, Col, Container, Card } from 'react-bootstrap';
import imgForCard from '../Data/psh.png';
import { ThemeContextConsumer } from '../ThemeContext';
function CardModel(props) {

    return (
        <ThemeContextConsumer>{context => (
            <Card className={context.theme+" cardModel"}>
                <Card.Img src={imgForCard} className="imgForCard" />
                <Card.Body className="textForCard">

                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px">
                        <circle cx="8" cy="8" r="8" fill={props.cult.color} />
                    </svg>
                    <Col style={{ margin: '0px 5px' }}>
                        <Card.Title className={context.theme + " titleCardModels"}>{props.cult.culture}</Card.Title>
                        <Card.Text style={{ margin: '0px!important' }}>
                            <p className="paramForModelCard">{props.cult.viewModel}</p>
                            <p className="paramForModelCard">{props.cult.currentEvent}</p>
                            <p className="paramForModelCard">{props.cult.advice}</p>
                        </Card.Text>
                    </Col>
                </Card.Body>
            </Card >)}
        </ThemeContextConsumer>
    )

} export default CardModel;