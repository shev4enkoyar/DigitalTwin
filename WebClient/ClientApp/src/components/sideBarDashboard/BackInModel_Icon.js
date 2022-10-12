import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
/*import back_Icon from '../data/BackIn_Icon.svg';*/
import React from "react";
function BackIn_Icon(props) {

	return (
			<Nav.Link onClick={() => { props.updateActive() }} >
				<img className="imgForPanel"  />
			</Nav.Link >
	)
} export default BackIn_Icon;