import React from "react";
import './SideBarDashboard.css';
/*import cultureIcon from '../data/cultureIcon.svg';*/
import { NavLink } from "reactstrap/lib";
import { ThemeContextConsumer } from '../ThemeContext';
function CultureIcon(props) {

	return (
		<ThemeContextConsumer>{context => (
			<NavLink onClick={() => { props.updateActive() }} >
				<img className={context.theme + "Icon smallIcon" } />
			</NavLink >
		)
		}
			</ThemeContextConsumer>
	)
} export default CultureIcon;