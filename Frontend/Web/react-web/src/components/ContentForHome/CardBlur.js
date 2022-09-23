import './ContentForHome.css';
import DarkCardForHome from './DarkCardForHome/DarkCardForHome.js';
import GroupTarif from './DarkCardForHome/GroupTarif.js';
import { ThemeContextConsumer } from "../ThemeContext"
function CardBlur() {
    const ContentForHome = [(
        <p style={{ fontSize: '17px', margin: '0px', fontFamily:'Roboto' }}>
            Digital Twin - это цифровой двойник вашего
            агропромышленного предприятия, позволяющий
            выполнять онлайн прогнозирование урожайности и различных ситуаций
        </p>
    ), (
        <p style={{ fontSize: '12px', margin: '4em 0px', fontFamily: 'Open Sans'}}>
            Что-нибудь еще о том, какие мы хорошие,
            и почему нужно пользоваться нашим сервисом
        </p>
    ), (<GroupTarif/>)];

    return (
        <ThemeContextConsumer>
            {
                context=>(
                    <div id="MarginForBlur">
                        <div id="BorderForBlur">
                            <div id="ContBlur">
                                    <DarkCardForHome contentForHome={ContentForHome[0]} lightGray="" />
                                    <DarkCardForHome contentForHome={ContentForHome[1]} lightGray="" />
                                    <DarkCardForHome contentForHome={ContentForHome[2]} lightGray={context.theme+"Gray"} />
                            </div>
                        </div>
                    </div>
                )
            }
        </ThemeContextConsumer>
    );
}

export default CardBlur;