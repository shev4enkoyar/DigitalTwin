import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
/*import Map_icon from '../data/Map_Icon.svg';*/
import React from "react";
function Map_Icon(props) {

	return (
		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel"  />
		</Nav.Link >
	)
} export default Map_Icon;