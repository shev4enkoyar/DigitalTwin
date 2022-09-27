import React, { useState } from 'react';
import Profile_Icon from '../Header/Profile_Icon';
import { NavLink } from 'react-router-dom';
import './SideBar.css';
import PopUpWithBlurCanvas from './../popUp/PopUpWithBlurCanvas';

const Sidebar = ({ children, alt, block, icons, color, isBlur, isActive, handleActiveChange }) => {
    
    return (
        <>
            <div className={"sidebar" + (block ? "_blocked " : " ") + (alt ? " alt " : " ")+ (color ? color : "orange")}>
                <div className={"top_section" + (block ? "_blocked" : "")}>

            </div>
            
                {
                    icons.map((item, index) => (
                        <NavLink to={item.path} key={index} className={"TextPanel " + (alt ? "reverse" : "")} activeclassName="activeForPanel">
                            <div dataName={item.name} className={"IconForPanel" + (block ? "_blocked" : "")}>{item.icon}</div>
                            <div className={"TextForButPanel" + (block ? "_blocked" : "")}>{item.name}</div>
                        </NavLink>
                    ))
                }
            <main>{children}</main>
            </div>
            <div className="blur"></div >
        </>
    );
};

export default Sidebar;