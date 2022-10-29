import './CardModels.css';
import React from "react";
import {ThemeContextConsumer} from "../../../components/ThemeContext";
import Col from "react-bootstrap/lib/Col";
import {Card} from "reactstrap/lib";
function CardModel(props) {

    return (
        <ThemeContextConsumer>{context => (
            <Card className={context.theme+" cardModel"}>
                <img className="imgForCard" src={process.env.PUBLIC_URL + '/images/psh.png'}/>
                <div className="textForCard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px">
                        <circle cx="8" cy="8" r="8" fill={'rgba('+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255) +','+ Math.floor(Math.random()*255) +',0.8)'} />
                    </svg>
                    <Col style={{ margin: '0px 5px' }}>
                        <div className={context.theme + " titleCardModels"}>
                            {props.title}
                        </div>
                        <div style={{ margin: '0px!important' }}>
                            {props.children}
                        </div>

                    </Col>
                </div>
            </Card >)}
        </ThemeContextConsumer>
    )

} export default CardModel;