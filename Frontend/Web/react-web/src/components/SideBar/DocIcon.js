import { Nav } from 'react-bootstrap';
import './SideBar.css';
import docIcon from '../Data/DocIcon.svg';
function DocIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={docIcon} />
		</Nav.Link >
	)
} export default DocIcon;