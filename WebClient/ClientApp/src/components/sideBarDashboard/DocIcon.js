import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
/*import docIcon from '../data/DocIcon.svg';*/
import React from "react";
function DocIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" />
		</Nav.Link >
	)
} export default DocIcon;