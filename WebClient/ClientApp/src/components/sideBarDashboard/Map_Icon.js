
import './SideBarDashboard.css';
/*import Map_icon from '../data/Map_Icon.svg';*/
import React from "react";
import { NavLink } from "reactstrap/lib";
function Map_Icon(props) {

	return (
		<NavLink onClick={() => { props.updateActive() }} >
			<img className="imgForPanel"  />
		</NavLink >
	)
} export default Map_Icon;