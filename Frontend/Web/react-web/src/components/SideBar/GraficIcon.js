import { Nav } from 'react-bootstrap';
import './SideBar.css';
import graphicIcon from '../Data/GraphicIcon.svg';
function GraphicIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img className="imgForPanel" src={graphicIcon} />
		</Nav.Link >
	)
} export default GraphicIcon;