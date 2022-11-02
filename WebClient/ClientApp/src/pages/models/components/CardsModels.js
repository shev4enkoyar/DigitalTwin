import React from "react";
import { Container } from "reactstrap/lib";
import CardModel from './CardModel';
import './CardModels.css';
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

} export default CardsModels;