import React from "react";
import { Button } from "reactstrap/lib";
import { ThemeContextConsumer } from "../../ThemeContext";
function VectorIcon(props) {
    return (
        <ThemeContextConsumer>
            {context => 
            (
                <Button style={{ backgroundColor: 'transparent', border: 'none' }} className={context.theme + (props.Gray ? "Gray " : " ") + "shadow-none"} onClick={context.toggleTheme}>
                    <img fill="#000000" src="https://www.svgrepo.com/show/71693/sun-bright.svg" className={context.theme + (props.Gray ? "Gray " : "Icon ")} style={{ filter: 'invert(1)', width: '25px', height:'25px' }} />
                </Button>
            )}
        </ThemeContextConsumer>
    )
} export default VectorIcon;