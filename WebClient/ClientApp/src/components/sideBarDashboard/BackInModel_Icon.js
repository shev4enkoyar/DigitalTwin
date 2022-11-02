
import './SideBarDashboard.css';
/*import back_Icon from '../data/BackIn_Icon.svg';*/
import React from "react";
import { NavLink } from "reactstrap/lib";
function BackIn_Icon(props) {

	return (
			<NavLink onClick={() => { props.updateActive() }} >
				<img className="imgForPanel"  />
			</NavLink >
	)
} export default BackIn_Icon;