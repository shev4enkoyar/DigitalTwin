import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
/*import Home_Icon from '../data/HomePanel.svg';*/
import React from "react";
function HomePanel_Icon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel"  />
		</Nav.Link >
	)
} export default HomePanel_Icon;