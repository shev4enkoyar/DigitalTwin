import { Nav } from 'react-bootstrap';
import './SideBar.css';
import mtStationIcon from '../Data/MTStationIcon.svg';
import { ThemeContextConsumer } from '../ThemeContext';
function MTStationIcon(props) {

	return (
		<ThemeContextConsumer>{context=>(
		<Nav.Link onClick={() => { props.updateActive() }} >
				<img className={context.theme +"Icon imgForPanel"} src={mtStationIcon} />
			</Nav.Link >
		)}</ThemeContextConsumer>
	)
} export default MTStationIcon;