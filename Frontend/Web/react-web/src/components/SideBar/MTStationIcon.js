import { Nav } from 'react-bootstrap';
import './SideBar.css';
import mtStationIcon from '../Data/MTStationIcon.svg';
function MTStationIcon(props) {

	return (
		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={mtStationIcon} />
		</Nav.Link >
	)
} export default MTStationIcon;