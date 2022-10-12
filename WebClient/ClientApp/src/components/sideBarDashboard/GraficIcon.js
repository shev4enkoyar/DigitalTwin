import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
/*mport graphicIcon from '../data/GraphicIcon.svg';*/
import React from "react";
function GraphicIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel"  />
		</Nav.Link >
	)
} export default GraphicIcon;