import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
import Sens_Icon from '../data/SensorIoT_Icon.svg';
function SensorsIoT(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={Sens_Icon} />
		</Nav.Link >
	)
} export default SensorsIoT;