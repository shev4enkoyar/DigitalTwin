/*import field from '../../../public/images/Frame25.png';*/
import React from 'react';
import { Container } from "reactstrap/lib";
import GroupTarif from "../../../components/ContentForHome/DarkCardForHome/GroupTarif";
import { ThemeContextConsumer } from "../../../components/ThemeContext";
import '../Home.css';
import CarouselMenu from "./CarouselMenu";
import ContainerBlur from './ContainerBlur.js';
const HomeContent = () => {
    const content = [
        (
            <p >
                Digital Twin - это цифровой двойник вашего
                агропромышленного предприятия, позволяющий
                выполнять онлайн прогнозирование урожайности и различных ситуаций
            </p>
        )
    ];
    return (
        <ThemeContextConsumer>
            {
                context => (
                    <Container className="backgroundContainer" fluid>
                        <ContainerBlur >
                            <div style={{ padding: 0, border: 0 }} className={context.theme + "Gray " + context.theme + " card text-center "}>
                                <CarouselMenu />
                            </div>
                            {
                                content.map(el => <div className={context.theme + " " + context.theme + "BorderForCard card text-center  p-3"}>{el}</div>)
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