import { ThemeContextConsumer } from '../ThemeContext';
import './Background.css';
function Background(props) {

    return (
        <ThemeContextConsumer>{context => (
            <div className={context.theme + 'Gray background'} style={props.style}/>
        )
        }
        </ThemeContextConsumer>
    )
} export default Background;