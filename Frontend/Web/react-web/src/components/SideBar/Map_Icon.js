import { Nav } from 'react-bootstrap';
import './SideBar.css';
import Map_icon from '../Data/Map_Icon.svg';
function Map_Icon(props) {

	return (
		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={Map_icon} />
		</Nav.Link >
	)
} export default Map_Icon;