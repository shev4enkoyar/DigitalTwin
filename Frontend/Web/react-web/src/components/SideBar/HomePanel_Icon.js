import { Nav } from 'react-bootstrap';
import './SideBar.css';
import Home_Icon from '../Data/HomePanel.svg';
function HomePanel_Icon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={Home_Icon} />
		</Nav.Link >
	)
} export default HomePanel_Icon;