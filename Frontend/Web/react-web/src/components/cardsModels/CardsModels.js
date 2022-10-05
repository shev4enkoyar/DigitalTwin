import './CardModels.css';
import { Row, Col, Container, Card } from 'react-bootstrap'; 
import CardModel from './CardModel';
function CardsModels(props) {

    return (
        <Container className="cardList">
            {
                props.culture.map(
                    (cult, index) => (
                        <CardModel key={index} cult={cult}/>
                    )
                )
            }
        </Container>
    )
        
}export default CardsModels;