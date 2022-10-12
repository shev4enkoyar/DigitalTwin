import '../Home.css';
import { Container } from 'react-bootstrap';
import React from 'react';
import { ThemeContextConsumer } from "../../../components/ThemeContext"
function ContainerBlur(props) {


    return (
        <ThemeContextConsumer>
            {
                context=>(
                    <Container className="blurContainer">
                        {props.children}
                    </Container>
                )
            }
        </ThemeContextConsumer>
    );
}

export default ContainerBlur;