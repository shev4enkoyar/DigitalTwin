import '../Home.css';
import { Container } from 'react-bootstrap';
import React from 'react';
function ContainerBlur(props) {


    return (
                    <Container className="blurContainer">
                        {props.children}
                    </Container>
    );
}

export default ContainerBlur;