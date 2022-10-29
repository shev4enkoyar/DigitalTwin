import './Input.css';
import React from "react";
import {Container} from "reactstrap/lib";
function Input(props) {
    return (
        <Container className={props.contClass+ " px-0"}>
            <p className={props.classNameP}>
                {props.Label}
            </p>
            <input onChange={props.onChange} onInput={props.onInput} value={props.value} className={props.className} placeholder={props.placeholder}/>
        </Container>

    );
} export default Input;