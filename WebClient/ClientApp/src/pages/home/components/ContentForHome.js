/*import field from '../../../public/images/Frame25.png';*/
import './ContentForHome.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import CardBlur from './CardBlur.js';
import { ThemeContextConsumer } from '../../../components/ThemeContext.js';
const ContentForHome = () => {
    return (
            <ThemeContextConsumer>
                {
                    context => (
                        <Container className={context.theme+"Gray"} id="ContainerForHome">
                            {/*<img src={field} id="field" />*/}
                            <CardBlur />
                        </Container>
                    )
                }
            </ThemeContextConsumer>
    )
}

export default ContentForHome;