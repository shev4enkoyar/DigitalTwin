import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
import back_Icon from '../data/BackIn_Icon.svg';
function BackIn_Icon(props) {

	return (

		
			<Nav.Link onClick={() => { props.updateActive() }} >
				<img className="imgForPanel" src={back_Icon} />
			</Nav.Link >
	)
} export default BackIn_Icon;