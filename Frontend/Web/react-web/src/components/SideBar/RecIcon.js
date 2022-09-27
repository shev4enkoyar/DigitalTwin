import { Nav } from 'react-bootstrap';
import './SideBar.css';
import recIcon from '../Data/RecIcon.svg';
function RecIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={recIcon} />
		</Nav.Link >
	)
} export default RecIcon;