import '../Home.css';
import React from 'react';
import {Container} from "reactstrap/lib";
function ContainerBlur(props) {
    return (
        <Container className="blurContainer">
            {props.children}
        </Container>
    );
}

export default ContainerBlur;