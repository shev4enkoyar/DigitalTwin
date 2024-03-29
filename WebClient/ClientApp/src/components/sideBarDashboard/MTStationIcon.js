
import './SideBarDashboard.css';
/*import mtStationIcon from '../data/MTStationIcon.svg';*/
import React from "react";
import { NavLink } from "reactstrap/lib";
import { ThemeContextConsumer } from '../ThemeContext';
function MTStationIcon(props) {

	return (
		<ThemeContextConsumer>{context=>(
		<NavLink onClick={() => { props.updateActive() }} >
				<img className={context.theme +"Icon imgForPanel"}  />
			</NavLink >
		)}
		</ThemeContextConsumer>
	)
} export default MTStationIcon;