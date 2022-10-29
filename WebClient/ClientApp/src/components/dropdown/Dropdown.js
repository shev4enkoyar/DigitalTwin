import React, {useState} from "react";
import {Container} from "reactstrap";
import PopUpWithBlurCanvas from "../popUp/PopUpWithBlurCanvas";
export const Dropdown = (props) => {
    const [isActive, setActive] = useState(false);
    const handleActiveChange = () => {
        setActive(!isActive);
    }
    return (
        <div >
            <button >
                {props.title}
                <i className="fa fa-caret-down"></i>
            </button>
            <PopUpWithBlurCanvas isActive={isActive} handleActiveChange={() => handleActiveChange()}>
                <p>ssdsd</p>
            </PopUpWithBlurCanvas>
        </div>
    )
}