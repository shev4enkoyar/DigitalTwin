import './CardModels.css';
import React from "react";
import CardModel from './CardModel';
import {Container} from "reactstrap/lib";
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
        </Container>
    )
        
}export default CardsModels;