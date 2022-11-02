import React from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContextConsumer } from '../ThemeContext';
import './SideBarDashboard.css';

const SideBarDashboard = ({ children, alt, block, icons, color, isBlur, isActive, handleActiveChange }) => {
    
    return (
        <ThemeContextConsumer>
            {context => (
                <>
                    <div className={(color ? color + " " + context.theme : "orange")+" sidebar" + (block ? "_blocked " : " ") + (alt ? " alt " : " ")}>
                        <div className={"top_section" + (block ? "_blocked" : "")}/>
                        {
                            icons.map((item, index) => (
                                <NavLink to={item.path} key={index} className={"TextPanel " + (alt ? "reverse" : "")} activeclassName="activeForPanel">
                                    <div dataName={item.name} className={"IconForPanel" + (block ? "_blocked" : "")}>
                                        {item.icon}
                                    </div>
                                    <div className={(color ? color + " " + context.theme : "orange") + " TextForButPanel" + (block ? "_blocked" : "")}>
                                        {item.name}
                                    </div>
                                </NavLink>
                            ))
                        }
                            <main>{children}</main>
                    </div>
                    <div className="blur"/>
                </>
            )
            }
        </ThemeContextConsumer>
        
    );
};

export default SideBarDashboard;