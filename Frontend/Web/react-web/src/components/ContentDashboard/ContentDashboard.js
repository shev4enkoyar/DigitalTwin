import CardForBody from './../cardForBody/CardForBody';
import './ContentDashboard.css';
import { Container, Col } from 'react-bootstrap';
import { ThemeContextConsumer } from '../ThemeContext';
import map_icon from './../Data/Map_Icon.svg';
import Combobox from './../Combobox/ComboBox.js';
import Input from '../input/Input';
import sen_icon from './../Data/SensorIoT_Icon.svg';
import { DashboardCard, EconomicCard, FieldCard, HistoryCard, MachineCard,IoTCard, CultureCard, ChemistryCard } from './DashboardCard';
import ButtonEdit from '../Button/ButtonEdit';
import { useState } from 'react';
function ContentDashboard(props) {
    const [ isInherit, setInherit] = useState(props.isInherit? true:false)
    const inheritOff = () => {
        setInherit(false)
    }
    //let dashCard = [{ hText: "Статус модели", descr: "Требуется добавить исторические данные!", notifyColor: "#DC3545", isTextAndBut: true },
    //    { hText: "Статус модели", descr: "Требуется добавить данные о культуре!", notifyColor: "#DC3545", isCombBut: true },
    //    { hText: "Статус модели", descr: "Требуется добавить технику!", notifyColor: "#DC3545", isCombInpBut: true },
    //    { hText: "Статус модели", descr: "Требуется заполнить данные карты!", notifyColor: "#DC3545", isBut: <ButtonEdit className="blueBut ButAllMini" image={map_icon} imageClassName="icon_for_but"/> },
    //    { hText: "Статус датчиков", descr: "Нет ни одного датчика!", notifyColor: "#E2891F", isBut: <ButtonEdit className="redBut ButAllMini" image={sen_icon} imageClassName="icon_for_but" /> },
    //    { hText: "Статус модели", descr: "Требуется определить тип почвы!", notifyColor: "#DC3545", isCombBut: true }]
    console.log(props.isInherit)
        return (
            <ThemeContextConsumer>{context => (
                <Container className={context.theme + "Gray "+ "contForDashboardEM "}>
                    {
                        (!isInherit) ? '' :
                            <HistoryCard isPred={() => inheritOff()}></HistoryCard>
                    }
                    <CultureCard/>
                    <FieldCard />
                    <MachineCard />
                    <ChemistryCard/>
                    <IoTCard/>
                    <EconomicCard/>
                        
                </Container>
            )
            }
            </ThemeContextConsumer>
        );
}export default ContentDashboard;