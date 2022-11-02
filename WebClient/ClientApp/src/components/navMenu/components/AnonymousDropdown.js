import React, { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem, NavItem, NavLink,
} from 'reactstrap';
import {Link} from "react-router-dom";
import {ThemeContextConsumer} from "../../ThemeContext";
import {ApplicationPaths} from "../../api-authorization/ApiAuthorizationConstants";

function AnonymousDropdown({ direction, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <ThemeContextConsumer>{
            context=>(
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                    <DropdownToggle color="transparent" caret>
                        <img className={context.theme + "Icon" + " icon"} src="https://www.svgrepo.com/show/333287/profile.svg"/>
                    </DropdownToggle>
                    <DropdownMenu {...args}>
                        <DropdownItem>
                            <NavItem >
                                <NavLink style={{color: "black"}} className={context.theme} tag={Link} to={`${ApplicationPaths.Register}`}>Зарегистрироваться</NavLink>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                            <NavItem>
                                <NavLink style={{color: "black"}} className={context.theme} tag={Link} to={`${ApplicationPaths.Login}`}>Войти</NavLink>
                            </NavItem>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            )
        }
        </ThemeContextConsumer>
    );
}

export default AnonymousDropdown;