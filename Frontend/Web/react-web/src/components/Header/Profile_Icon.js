import {  Nav} from 'react-bootstrap';
import './Header.css';
import profile from '../Data/profile.svg';
import { ThemeContextConsumer } from "../ThemeContext.js";
function Profile_Icon(props) {
	
	return (
		
		<ThemeContextConsumer >{context => (
				/*<Nav.Link href="/profile" className={context.theme + " navbar-brand"}>*/
			<img id="Layer_1" className={context.theme + (props.Gray ? "Gray " : " ") + " icon_for_header"} src={profile} />	

				/*</Nav.Link >*/
			)
		}
		</ThemeContextConsumer>
		)
} export default Profile_Icon;