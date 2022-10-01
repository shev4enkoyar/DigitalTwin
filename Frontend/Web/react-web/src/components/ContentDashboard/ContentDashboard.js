import CardForBody from './../cardForBody/CardForBody';
import './ContentDashboard.css';
import { Container, Col } from 'react-bootstrap';
import { ThemeContextConsumer } from '../ThemeContext';
import map_icon from './../Data/Map_Icon.svg';
import Combobox from './../Combobox/ComboBox.js';
import Input from '../input/Input';
import sen_icon from './../Data/SensorIoT_Icon.svg';
import { DashboardCard } from './../classForDataBase';
import ButtonEdit from '../Button/ButtonEdit';
function ContentDashboard() {
    let dashCard = [{ hText: "Статус модели", descr: "Требуется добавить исторические данные!", notifyColor:"#DC3545", isHistory:true },
        { hText: "Статус модели", descr: "Требуется добавить технику!", notifyColor: "#DC3545", isTeh: true },
        { hText: "Статус модели", descr: "Требуется заполнить данные карты!", notifyColor: "#DC3545", isBut: <ButtonEdit className="blueBut ButAllMini" image={map_icon} imageClassName="icon_for_but"/> },
        { hText: "Статус датчиков", descr: "Нет ни одного датчика!", notifyColor: "#E2891F", isBut: <ButtonEdit className="redBut ButAllMini" image={sen_icon} imageClassName="icon_for_but" /> },
        { hText: "Статус модели", descr: "Требуется определить тип почвы!", notifyColor: "#DC3545", isEarth:true }]

        return (
            <ThemeContextConsumer>{context => (
                <Container className={context.theme + "Gray "+ "contForDashboardEM "}>
                    {dashCard.map((content) => (
                        <DashboardCard hText={content.hText} descr={content.descr} notifyColor={content.notifyColor} isBut={content.isBut} isHistory={content.isHistory} isTeh={content.isTeh} isEarth={content.isEarth} />
                            ))}
                </Container>
            )
            }
            </ThemeContextConsumer>
        );
}export default ContentDashboard;