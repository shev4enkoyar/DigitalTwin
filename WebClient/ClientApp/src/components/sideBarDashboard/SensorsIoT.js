
import './SideBarDashboard.css';
/*import Sens_Icon from '../data/SensorIoT_Icon.svg';*/
import React from "react";
import { NavLink } from "reactstrap/lib";
function SensorsIoT(props) {

    return (


        <NavLink onClick={() => { props.updateActive() }} >
            <img className="imgForPanel" />
        </NavLink >
    )
} export default SensorsIoT;