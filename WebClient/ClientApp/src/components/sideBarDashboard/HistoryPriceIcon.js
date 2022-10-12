import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
/*import historyPriceIcon from '../data/HistoryPriceIcon.svg';*/
import React from "react";
function HistoryPriceIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img style={{width:'14px'}} />
		</Nav.Link >
	)
} export default HistoryPriceIcon;