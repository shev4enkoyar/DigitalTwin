import { ThemeContextConsumer } from './../../components/ThemeContext';
import './ElementStep.css';
import React from "react";
import { Container } from "reactstrap";
const ElementStep = (props) => {
    
    return (
        <>
            <ThemeContextConsumer>
                {
                    context => (
                        <Container className={context.theme + (props.progress ? "progressStep " : context.theme === "light" ? "lightStep":"") + " px-1 m-0 d-flex justify-content-center align-items-center"} style={{ minHeight: '55px', width: 'calc(100%/7)', height: '100%' }}>
                            <div className={context.theme + (props.progress ? "progressStep " : "") + " circleStep rounded-circle d-flex justify-content-center align-items-center mr-1"}>
                                <label className=" m-0" style={{ color: '#262626', fontFamily: "Open Sans" }}>
                                    {props.numberStep}
                                </label>
                            </div>
                            <label className={context.theme + (props.progress ? "progressStep colorText" : context.theme === "light" ? "lightStep" : " colorText")+" textForStep m-0"} style={{fontFamily: "Open Sans", fontSize: '80%' }}>{props.nameCard}</label>
                        </Container>
                    )
                }
            </ThemeContextConsumer>
        </>
    )
}
export default ElementStep;