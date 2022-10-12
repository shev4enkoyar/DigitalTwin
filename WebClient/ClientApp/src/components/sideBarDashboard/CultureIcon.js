import React from "react";
import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
/*import cultureIcon from '../data/cultureIcon.svg';*/
import { ThemeContextConsumer } from '../ThemeContext';
function CultureIcon(props) {

	return (
		<ThemeContextConsumer>{context => (
			<Nav.Link onClick={() => { props.updateActive() }} >
				<img className={context.theme + "Icon smallIcon" } />
			</Nav.Link >
		)
		}
			</ThemeContextConsumer>
	)
} export default CultureIcon;