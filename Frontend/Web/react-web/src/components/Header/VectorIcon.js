import { Nav } from 'react-bootstrap';
import './Header.css';
import { ThemeContextConsumer } from "../ThemeContext.js";
import vector from '../data/vector.svg';
function VectorIcon(props) {
    return (
        <ThemeContextConsumer>
            {context => (<Nav.Link className={context.theme + (props.Gray ? "Gray " : " ") + " navbar-brand"} onClick={context.toggleTheme}>
                <img fill="#000000" src={vector} className={context.theme + (props.Gray ? "Gray " : " ") + " icon_for_header"} />
            </Nav.Link>)}
        </ThemeContextConsumer>
    )
} export default VectorIcon;