import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
import historyPriceIcon from '../data/HistoryPriceIcon.svg';
function HistoryPriceIcon(props) {

	return (


		<Nav.Link onClick={() => { props.updateActive() }} >
			<img style={{width:'14px'}} src={historyPriceIcon} />
		</Nav.Link >
	)
} export default HistoryPriceIcon;