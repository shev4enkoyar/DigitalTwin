import { Nav } from 'react-bootstrap';
import '../Header.css';
import { ThemeContextConsumer } from "../../ThemeContext.js";
import bell from "../../data/bell_icon.svg";
function BellIcon(props) {

	return (

		<ThemeContextConsumer >{context => (
			<Nav.Link href="#nogo" className={context.theme + (props.Gray ? "Gray " : " ") + " navbar-brand"}>
				<img src={bell} className={context.theme + (props.Gray ? "Gray " : " ") + " icon_for_header"} />
			</Nav.Link >
		)
		}
		</ThemeContextConsumer>
	)
} export default BellIcon;