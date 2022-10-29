
import './SideBarDashboard.css';
/*import docIcon from '../data/DocIcon.svg';*/
import React from "react";
import {NavLink} from "reactstrap/lib";
function DocIcon(props) {

	return (


		<NavLink onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" />
		</NavLink >
	)
} export default DocIcon;