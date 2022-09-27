
import { Nav } from 'react-bootstrap';
import './SideBar.css';
import ioTIcon from '../Data/IoTIcon.svg';
function IoTIcon(props) {

	return (
		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="smallIcon" src={ioTIcon} />
		</Nav.Link >
	)
} export default IoTIcon;