import { Nav } from 'react-bootstrap';
import '../Header.css';
import { ThemeContextConsumer } from "../../ThemeContext.js";
function Bell_Icon(props) {

	return (

		<ThemeContextConsumer >{context => (
			<Nav.Link href="#nogo" className={context.theme + " navbar-brand"}>
				
					<svg version="1.1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 28 28" className={context.theme + " icon_for_header"}>
					<path d="M16.267 4c-0.994 0-1.8 0.806-1.8 1.8v0.834c-3.104 0.8-5.4 3.611-5.4 6.966v7.2l-2.4 2.4v1.2h19.2v-1.2l-2.4-2.4v-7.2c0-3.354-2.296-6.165-5.4-6.966v-0.834c0-0.994-0.806-1.8-1.8-1.8zM13.867 25.6c0 1.32 1.080 2.4 2.4 2.4s2.4-1.080 2.4-2.4h-4.8z"></path>
				</svg>
			</Nav.Link >)
		}
		</ThemeContextConsumer>
	)
} export default Bell_Icon;