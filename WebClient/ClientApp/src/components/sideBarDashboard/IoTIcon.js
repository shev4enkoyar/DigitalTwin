import './SideBarDashboard.css';
/*import ioTIcon from '../data/IoTIcon.svg';*/
import React from "react";
import { ThemeContextConsumer } from '../ThemeContext';
import {NavLink} from "reactstrap/lib";
function IoTIcon(props) {

	return (
		<ThemeContextConsumer>{context => (
			<NavLink onClick={() => { props.updateActive() }} className={context.theme}>
				<img className={context.theme + "Icon smallIcon"}  />
			</NavLink >
		)}
			</ThemeContextConsumer>
	)
} export default IoTIcon;