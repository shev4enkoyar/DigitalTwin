
import { Nav } from 'react-bootstrap';
import './SideBar.css';
import cultureIcon from '../Data/cultureIcon.svg';
function CultureIcon(props) {

	return (
		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="smallIcon" src={cultureIcon} />
		</Nav.Link >
	)
} export default CultureIcon;