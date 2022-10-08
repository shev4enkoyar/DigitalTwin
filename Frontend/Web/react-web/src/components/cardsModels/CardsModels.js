import './CardModels.css';
import { Row, Col, Container, Card } from 'react-bootstrap'; 
import CardModel from './CardModel';
function CardsModels(props) {

    return (
        <Container className="cardList">
            <div className="forCards">
                {
                props.culture.map(
                    (cult, index) => (
                        <CardModel key={index} cult={cult} />
                    )
                )
                }
            </div>
            <div>
                {props.children}
            </div>
        </Container>
    )
        
}export default CardsModels;