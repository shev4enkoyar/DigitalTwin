import CardForBody from './../cardForBody/CardForBody';
import './ContentDashboard.css';
import { Container, Col } from 'react-bootstrap';
import { ThemeContextConsumer } from '../ThemeContext';
import ButtonOpt from '../Button/ButtonOpt';
import ButtonSensorOiT from './../Button/ButtonSensorIoT';
import Combobox from './../Combobox/ComboBox.js';
import Input from '../input/Input';
import { DashboardCard } from './../classForDataBase';
import MapBut from '../Button/MapBut';
function ContentDashboard() {
    let dashCard = [{hText: "Статус модели", descr: "Требуется добавить исторические данные!", isHistory:true },
        { hText: "Статус модели", descr: "Требуется добавить технику!", isTeh:true },
        { hText: "Статус модели", descr: "Требуется заполнить данные карты!", isBut: <MapBut /> },
        { hText: "Статус датчиков", descr: "Нет ни одного датчика!", isBut: <ButtonSensorOiT /> },
        { hText: "Статус модели", descr: "Требуется определить тип почвы!",isEarth:true }]

        return (
            <ThemeContextConsumer>{context => (
                <Container className={context.theme + "Gray "+ "contForDashboardEM "}>
                    {dashCard.map((content) => (
                        <DashboardCard hText={content.hText} descr={content.descr} isBut={content.isBut} isHistory={content.isHistory} isTeh={content.isTeh} isEarth={content.isEarth} />
                            ))}
                </Container>
            )
            }
            </ThemeContextConsumer>
        );
}export default ContentDashboard;