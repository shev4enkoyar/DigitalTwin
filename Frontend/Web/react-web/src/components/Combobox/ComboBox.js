import React, { Component } from 'react';
import './ComboBox.css';
function Combobox(props) {
    
        return (
            <>
                <div className={ "form-group contForCombobox "+props.classNameCont}>
                    <label className={props.classTextCombobox} >{props.textCombobox}</label>
                    <select className="form-control " id="FormControlSelect">
                        {props.options.map((option) =>
                            <option className="opt">{option}</option>)}
                    </select>
                </div>
            </>
        )
    }export default Combobox;