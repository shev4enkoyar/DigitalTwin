import React from 'react';
import { Container } from "reactstrap/lib";
import '../Home.css';
function ContainerBlur(props) {
    return (
        <Container className="blurContainer">
            {props.children}
        </Container>
    );
}

export default ContainerBlur;