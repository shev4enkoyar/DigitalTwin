/*import field from '../../../public/images/Frame25.png';*/
import '../Home.css';
import React from 'react';
import ContainerBlur from './ContainerBlur.js';

import GroupTarif from "../../../components/ContentForHome/DarkCardForHome/GroupTarif";
import {ThemeContextConsumer} from "../../../components/ThemeContext";
import {Container} from "reactstrap/lib";
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
        )
    ];
    return (
            <ThemeContextConsumer>
            {
                context => (
                    <Container className="backgroundContainer" fluid>
                            <ContainerBlur >
                                {
                                    content.map(el => <div className={context.theme +" "+ context.theme+"BorderForCard card text-center  p-3"}>{el}</div>)
                                }
                                <div className={context.theme + "Gray " + context.theme + "BorderForCard card text-center p-3"}>
                                    <GroupTarif />
                                </div>
                            </ContainerBlur>
                        </Container>
                    )
                }
            </ThemeContextConsumer>
    )
}

export default HomeContent;