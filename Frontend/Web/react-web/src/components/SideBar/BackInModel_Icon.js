import { Nav } from 'react-bootstrap';
import './SideBar.css';
import back_Icon from '../Data/BackIn_Icon.svg';
function BackIn_Icon(props) {

	return (

		
			<Nav.Link onClick={() => { props.updateActive() }} >
				<img className="imgForPanel" src={back_Icon} />
			</Nav.Link >
	)
} export default BackIn_Icon;