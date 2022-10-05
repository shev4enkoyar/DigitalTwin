import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
import graphicIcon from '../data/GraphicIcon.svg';
function GraphicIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={graphicIcon} />
		</Nav.Link >
	)
} export default GraphicIcon;