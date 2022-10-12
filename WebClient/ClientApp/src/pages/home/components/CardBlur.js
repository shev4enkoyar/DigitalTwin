import './ContentForHome.css';
import DarkCardForHome from '../../../components/ContentForHome/DarkCardForHome/DarkCardForHome.js';
import GroupTarif from '../../../components/ContentForHome/DarkCardForHome/GroupTarif.js';
import { Container } from 'react-bootstrap';
import React from 'react';
import { ThemeContextConsumer } from "../../../components/ThemeContext"
function CardBlur() {
    const ContentForHome = [
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
                context=>(
                    <Container id="MarginForBlur">
                        <div id="BorderForBlur">
                            <div id="ContBlur">
                                    <DarkCardForHome contentForHome={ContentForHome[0]} lightGray="" />
                                    <DarkCardForHome contentForHome={ContentForHome[1]} lightGray="" />
                                    <DarkCardForHome contentForHome={ContentForHome[2]} lightGray={context.theme+"Gray"} />
                            </div>
                        </div>
                    </Container>
                )
            }
        </ThemeContextConsumer>
    );
}

export default CardBlur;