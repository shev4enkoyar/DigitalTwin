
import './SideBarDashboard.css';
/*import Home_Icon from '../data/HomePanel.svg';*/
import React from "react";
import {NavLink} from "reactstrap/lib";
function HomePanel_Icon(props) {

	return (


		<NavLink onClick={() => { props.updateActive() }} >
			<img className="imgForPanel"  />
		</NavLink >
	)
} export default HomePanel_Icon;