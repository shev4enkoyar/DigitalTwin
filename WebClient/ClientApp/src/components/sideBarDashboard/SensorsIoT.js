import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
/*import Sens_Icon from '../data/SensorIoT_Icon.svg';*/
import React from "react";
function SensorsIoT(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel"  />
		</Nav.Link >
	)
} export default SensorsIoT;