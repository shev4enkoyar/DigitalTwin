import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
/*import recIcon from '../data/RecIcon.svg';*/
import React from "react";
function RecIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel"  />
		</Nav.Link >
	)
} export default RecIcon;