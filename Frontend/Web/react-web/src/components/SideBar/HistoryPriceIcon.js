import { Nav } from 'react-bootstrap';
import './SideBar.css';
import historyPriceIcon from '../Data/HistoryPriceIcon.svg';
function HistoryPriceIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img style={{width:'14px'}} src={historyPriceIcon} />
		</Nav.Link >
	)
} export default HistoryPriceIcon;