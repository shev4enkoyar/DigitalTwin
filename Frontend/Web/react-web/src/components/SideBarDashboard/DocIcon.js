import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
import docIcon from '../data/DocIcon.svg';
function DocIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={docIcon} />
		</Nav.Link >
	)
} export default DocIcon;