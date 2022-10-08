import { ThemeContextConsumer } from '../ThemeContext';
function Background(props) {

    return (
        <ThemeContextConsumer>{context => (
            <div className={context.theme + 'Gray'} style={{ position: "fixed", backgroundColor: '#262626', padding: '0px', width: '100%', margin: '0px', maxWidth: '100%', height: '100%' }} />
        )
        }
        </ThemeContextConsumer>
    )
} export default Background;