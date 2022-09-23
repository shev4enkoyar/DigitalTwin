import './DarkCardForHome.css';
import { Container } from 'react-bootstrap';
import Tarif from './Tarif/Tarif.js';
import { ThemeContextConsumer } from "../../ThemeContext"
function GroupTarif() {
    const tariffs = [
        {
            name: "Прогнозирование урожайности",
            cost: "5000 руб/год",
            possibility: ["Возможность 1","Возможность 2","Возможность 3","Возможность 4","Возможность 5"]
        },
        {
            name: "Прогнозирование нештатных ситуаций",
            cost: "10000 руб/год",
            possibility: ["Возможность 1", "Возможность 2", "Возможность 3", "Возможность 4", "Возможность 5"]
        },
        {
            name: "Поддержка принятия решений",
            cost: "15000 руб/год",
            possibility: ["Возможность 1", "Возможность 2", "Возможность 3", "Возможность 4", "Возможность 5"]
        }
    ]
    return (
        <ThemeContextConsumer>{context => (
            <Container className={context.theme + "Gray" + " textForCardDark"}>
                <p className={context.theme + "Gray"} style={{ fontSize: '17px', margin: '0px 0px 10px 0px', fontFamily: 'Roboto!important', background: '#ffffff00' }} >Тарифные планы</p>
                <Container id="TarifList">
                    <Tarif data={tariffs[0]} light={context.theme} />
                    < Tarif data={tariffs[1]} light={context.theme} />
                    <Tarif data={tariffs[2]} light={context.theme} />
                </Container>
            </Container>
        )}</ThemeContextConsumer>

    );
} export default GroupTarif;