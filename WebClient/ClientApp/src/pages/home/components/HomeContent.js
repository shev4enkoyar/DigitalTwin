/*import field from '../../../public/images/Frame25.png';*/
import '../Home.css';
import React from 'react';
import { Container } from 'react-bootstrap';
import ContainerBlur from './ContainerBlur.js';
import { ThemeContextConsumer } from '../../../components/ThemeContext.js';
import GroupTarif from "../../../components/ContentForHome/DarkCardForHome/GroupTarif";
const HomeContent = () => {
    const content = [
        (
            <p >
                Digital Twin - это цифровой двойник вашего
                агропромышленного предприятия, позволяющий
                выполнять онлайн прогнозирование урожайности и различных ситуаций
            </p>
        ),
        (
            <p style={{padding:  "20% 0"}}>
                Что-нибудь еще о том, какие мы хорошие,
                и почему нужно пользоваться нашим сервисом
            </p>
        ),
        (<GroupTarif />)
    ];
    return (
            <ThemeContextConsumer>
                {
                    context => (
                        <Container className="backgroundContainer" fluid>
                            <ContainerBlur >
                                {
                                    content.map(el => <div className="card text-center">{el}</div>)
                                }
                            </ContainerBlur>
                        </Container>
                    )
                }
            </ThemeContextConsumer>
    )
}

export default HomeContent;