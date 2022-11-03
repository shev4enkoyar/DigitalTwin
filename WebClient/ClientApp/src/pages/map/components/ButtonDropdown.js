import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';
export function ButtonDropdown(props) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="left">
            <DropdownToggle color="transparent" style={{padding: "4px"}} >
                <img style={{ height: "30px", width: "30px" }} src={props.el.icon} alt={"Logo"} className='icon' />
            </DropdownToggle>
            <DropdownMenu>
                {props.children}
            </DropdownMenu>
        </Dropdown>
    );
}