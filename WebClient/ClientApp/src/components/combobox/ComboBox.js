import React, { Component } from 'react';
import './ComboBox.css';
import { Container } from 'react-bootstrap';
function Combobox(props) {

    const changeSelect = (event) => {
        props.onChange((event.target.value) /*== props.options[0] ? true : false*/);
    }
    return (
        <>
            <Container className={"form-group contForCombobox px-0 " + props.classNameCont}>
                <label className={props.classTextCombobox} >
                    {props.textCombobox}
                </label>
                <select onChange={changeSelect} className={props.className + " form-control "}>
                    {props.options.map
                        (
                            (option) =>
                                <option className="opt">
                                    {option}
                                </option>
                        )
                    }
                </select>
            </Container>
        </>
    )
} export default Combobox;