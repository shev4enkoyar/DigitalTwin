import React, { Component } from 'react';
import './ComboBox.css';
function Combobox(props) {
        
        const changeSelect=(event)=>
        {
            props.setInherit((event.target.value) == props.options[0] ? true : false);
        }
        return (
            <>
                <div className={ "form-group contForCombobox "+props.classNameCont}>
                    <label className={props.classTextCombobox} >
                        {props.textCombobox}
                    </label>
                    <select onChange={changeSelect} className="form-control " id="FormControlSelect">
                        {props.options.map
                            (
                                (option) =>
                                    <option className="opt">
                                        {option}
                                    </option>
                            )
                        }
                    </select>
                </div>
            </>
        )
    }export default Combobox;