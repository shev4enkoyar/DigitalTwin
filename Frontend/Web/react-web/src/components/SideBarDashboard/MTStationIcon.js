import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
import mtStationIcon from '../data/MTStationIcon.svg';
import { ThemeContextConsumer } from '../ThemeContext';
function MTStationIcon(props) {

	return (
		<ThemeContextConsumer>{context=>(
		<Nav.Link onClick={() => { props.updateActive() }} >
				<img className={context.theme +"Icon imgForPanel"} src={mtStationIcon} />
			</Nav.Link >
		)}
		</ThemeContextConsumer>
	)
} export default MTStationIcon;