import './SideBarDashboard.css';
/*import ioTIcon from '../data/IoTIcon.svg';*/
import React from "react";
import { NavLink } from "reactstrap/lib";
import { ThemeContextConsumer } from '../ThemeContext';
function IoTIcon(props) {

    return (
        <ThemeContextConsumer>{context => (
            <NavLink onClick={() => { props.updateActive() }} className={context.theme}>
                <img className={context.theme + "Icon smallIcon"} />
            </NavLink >
        )}
        </ThemeContextConsumer>
    )
} export default IoTIcon;