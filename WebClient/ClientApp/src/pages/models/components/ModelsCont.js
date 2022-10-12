import './CardModels.css';
import {Container, Button} from 'react-bootstrap';
import CardsModels from './CardsModels';
import React from "react";
import { Link } from "react-router-dom"
import {ThemeContextConsumer} from "../../../components/ThemeContext";
function ModelsCont(props) {
    
    return (
        <ThemeContextConsumer>{context => (
            <>
                <Container className="ContForH">
                    <p className={context.theme + "Gray textForH"}>
                    Модели {props.culture.length}/15
                    </p>
                    <p className={context.theme + "Gray textForH"}>
                        Общая площадь 1234/5000
                    </p>
                </Container>

                <CardsModels culture={props.culture}>
                    <Link to={'/createModel'} style={{ padding: '0px', display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
                        <Button className="blueBut createBut" textForButton="Новая модель" classTextName="textOpenSans14" imageClassName="plus" >Плюсик</Button>
                    </Link>
                </CardsModels>
            </>
        )}
        </ThemeContextConsumer>
    )
} export default ModelsCont;