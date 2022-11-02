
import React from "react";
import { Container } from "reactstrap/lib";

let style = {
    position: "absolute",
    right: '0',
    margin: '10px 10px',
    borderRadius: '7px',
    zIndex: 100,
    background: '#262626',
    width: '50px',
    height: '80%',
    padding: '0px 0px'
};
const SidePanelCanvas = (props) => {
    return <div style={{ ...style }}>
        <div style={{ padding: "10px 15px" }}>
        </div>
        <Container style={{ padding: "0px 5px" }}>
            {props.children}
        </Container>
    </div>
}

export default SidePanelCanvas;