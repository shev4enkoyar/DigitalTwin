import './CardModels.css';
import { Row, Col, Container, Card } from 'react-bootstrap'; 
import CardModel from './CardModel';
function CardsModels(props) {

    return (
        <Container className="cardList">
            {
                props.culture.map(
                    (cult) => (
                        <CardModel cult={cult}/>
                    )
                )
            }
        </Container>
    )
        
}export default CardsModels;