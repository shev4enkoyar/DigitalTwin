import CardForBody from './../cardForBody/CardForBody';
import './ContentDashboard.css';
import { Container, Col } from 'react-bootstrap';
import { ThemeContextConsumer } from '../ThemeContext';
import map_icon from './../data/Map_Icon.svg';
import Combobox from './../combobox/ComboBox.js';
import Input from '../input/Input';
import sen_icon from './../data/SensorIoT_Icon.svg';
import { EconomicCard, FieldCard, HistoryCard, MachineCard, IoTCard, CultureCard, ChemistryCard } from './DashboardCard';
import ButtonEdit from '../button/ButtonEdit';
import { useState } from 'react';
function ContentDashboard(props) {
    const [modelState, setModelState] = useState([{ cult: 0, sort: 0, frac: "", gust: "", norm: "", total: "" }, { kad: "" }, { added: false }, { chem: false }, { dat: false }, { econom: false }])
    const [isInherit, setInherit] = useState(props.isInherit ? true : false)
    const inheritOff = () => {
        setInherit(false)
    }
    const isFull = (dict) => {
        if (dict === null || dict === undefined) {
        }
        return !Object.keys(dict).map(val => dict[val]).some(function (value, index, array) { return (value === false || value === 0 || value === "" || value === undefined) })
    }
    const getAble = (k) => {
        if (modelState.length < k) {
            return false
        }
        for (let i = 0; i < k; i++) {
            if (!isFull(modelState[i])) return false
        }
        return true
    }
    const setM = (i, f) => {
        setModelState(modelState.map((val, index) => index == i ? { ...val, ...f } : { ...val }))
        console.log(modelState)
    } 
    return (
        <ThemeContextConsumer>{context => (
            <Container className={context.theme + "Gray " + "contForDashboardEM "}>
                {
                    (!isInherit) ? '' :
                        <HistoryCard off={true} isPred={() => inheritOff()}></HistoryCard>
                }
                <CultureCard off={true} values={modelState[0]} setOff={setM} />
                <FieldCard off={getAble(1)} setOff={setM} />
                <MachineCard handleActiveChanged={props.handleActiveChanged} isActive={props.isActive} off={getAble(2)||true} setOff={setM} />
                <ChemistryCard off={getAble(3)} setOff={setM} />
                <IoTCard off={getAble(4)} setOff={setM} />
                <EconomicCard off={getAble(5)} setOff={setM} />

            </Container>
        )
        }
        </ThemeContextConsumer>
    );
} export default ContentDashboard;