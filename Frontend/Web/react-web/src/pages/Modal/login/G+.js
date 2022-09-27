
import './LogInPopUp.css';
import { ThemeContextConsumer } from "../../../components/ThemeContext";
function GPlus() {

	return (
		<ThemeContextConsumer >{context => (
			< svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" version="1.0" className={context.theme + " icon_for_modal"}>
				<path d="M12,2C6.477,2,2,6.477,2,12c0,5.523,4.477,10,10,10s10-4.477,10-10C22,6.477,17.523,2,12,2z M10,16c-2.209,0-4-1.791-4-4 c0-2.209,1.791-4,4-4c1.042,0,1.982,0.408,2.694,1.061l-1.093,1.034C11.167,9.729,10.613,9.5,10,9.5c-1.381,0-2.5,1.119-2.5,2.5 c0,1.381,1.119,2.5,2.5,2.5c1.209,0,2.218-0.859,2.45-2H10V11h3.859C13.942,11.321,14,11.653,14,12C14,14.209,12.209,16,10,16z M18,12v1.5h-1V12h-1.5v-1H17V9.5h1V11h1.5v1H18z" /></svg>		)
		}
		</ThemeContextConsumer>
	)
} export default GPlus;