import React from "react";
import { Container } from "reactstrap/lib";
import './Input.css';
function Input(props) {
    return (
        <Container className={props.contClass + " px-0"} style={props.styleContainer} hidden={props.hidden}>
            <Container className={props.classNameContP + " p-0 m-0 flex-wrap d-flex align-items-baseline"} style={{ width: 'max-content',maxWidth: '100%' } }>
                <p className={props.classNameP}>
                    {props.Label}
                </p>
                {props.children}
            </Container>
            <input onChange={props.onChange} onInput={props.onInput} value={props.value} className={props.className} placeholder={props.placeholder}/>
        </Container>

    );
} export default Input;