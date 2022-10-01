
import { Nav } from 'react-bootstrap';
import './SideBarDashboard.css';
import ioTIcon from '../Data/IoTIcon.svg';
import { ThemeContextConsumer } from '../ThemeContext';
function IoTIcon(props) {

	return (
		<ThemeContextConsumer>{context => (
			<Nav.Link onClick={() => { props.updateActive() }} className={context.theme}>
				<img className={context.theme + "Icon smallIcon"} src={ioTIcon} />
			</Nav.Link >
		)}
			</ThemeContextConsumer>
	)
} export default IoTIcon;