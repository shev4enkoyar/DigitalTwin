import React, { Component } from 'react';
import './ComboBox.css';
function Combobox(props) {
    
        return (
            <>
                <div className={ "form-group contForCombobox "+props.classNameCont}>
                    <label className={props.classTextCombobox} >{props.textCombobox}</label>
                    <select className="form-control " id="FormControlSelect">
                        <option className="opt">Выберите культуру...</option>
                        <option className="opt">Овес</option>
                        <option className="opt">Рис</option>
                    </select>
                </div>
            </>
        )
    }export default Combobox;