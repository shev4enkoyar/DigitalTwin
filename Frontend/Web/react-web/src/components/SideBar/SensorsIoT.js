import { Nav } from 'react-bootstrap';
import './SideBar.css';
import Sens_Icon from '../Data/SensorIoT_Icon.svg';
function SensorsIoT(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={Sens_Icon} />
		</Nav.Link >
	)
} export default SensorsIoT;