
import './LogInPopUp.css';
import { ThemeContextConsumer } from "../../components/ThemeContext";
function Yandex() {

	return (
		<ThemeContextConsumer >{context => (
			
<svg  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" className={context.theme + " icon_for_modal"}>
<path d="M 20.800781 1 L 15.199219 17.199219 
L 10.199219 4 L 7 4 L 14 22.599609 L 14 31 L 17 31 L 17 21.099609 L 24 1 L 20.800781 1 z"/>
					</svg>)
		}
		</ThemeContextConsumer>
	)
} export default Yandex;