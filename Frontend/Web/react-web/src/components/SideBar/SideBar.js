import React, { useState } from 'react';
import Profile_Icon from '../Header/Profile_Icon';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
import PopUpWithBlurCanvas from './../popUp/PopUpWithBlurCanvas';
import { ThemeContextConsumer } from '../ThemeContext';

const Sidebar = ({ children, alt, block, icons, color, isBlur, isActive, handleActiveChange }) => {
    
    return (
        
            <ThemeContextConsumer>
            {context => (
                <>
                    <div className={(color ? color + " " + context.theme : "orange")+" sidebar" + (block ? "_blocked " : " ") + (alt ? " alt " : " ")}>
                <div className={"top_section" + (block ? "_blocked" : "")}>
                </div>
                {
                    icons.map((item, index) => (
                        <NavLink to={item.path} key={index} className={"TextPanel " + (alt ? "reverse" : "")} activeclassName="activeForPanel">
                            <div dataName={item.name} className={"IconForPanel" + (block ? "_blocked" : "")}>{item.icon}</div>
                            <div className={(color ? color + " " + context.theme : "orange") + " TextForButPanel" + (block ? "_blocked" : "")}>{item.name}</div>
                        </NavLink>
                    ))
                }
            <main>{children}</main>
            </div>
                    <div className="blur"></div >
                </>
            )
            }
            </ThemeContextConsumer>
        
    );
};

export default Sidebar;