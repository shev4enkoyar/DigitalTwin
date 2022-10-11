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
    const [statusState, setStatusState] = useState({cult:false, kad: false, trans:false, chem: false,ioT:false,ak:false})
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
    const getAble1 = (k) => {
        return !Object.keys(statusState).map((val, i) => {return i<k? statusState[val]:true }).some(function (value, index, array) { return (value === false) })
    }
    const setM = (i, f) => {
        setModelState(modelState.map((val, index) => index == i ? { ...val, ...f } : { ...val }))
    }
    const setStatus = (value) => {
        setStatusState({...statusState, ...value })
        console.log(modelState)
    }
    return (
        <ThemeContextConsumer>{context => (
            <Container className={context.theme + "Gray " + "contForDashboardEM "}>
                {
                    (!isInherit) ? '' :
                        <HistoryCard off={true} isPred={() => inheritOff()}></HistoryCard>
                }
                <CultureCard off={true} values={modelState[0]} setOff={setM} setStatus={setStatus} />
                <FieldCard off={getAble(1)} setOff={setM} setStatus={setStatus} statusOff={getAble1(1)} />
                <MachineCard handleActiveChanged={props.handleActiveChanged} off={getAble(2)} statusOff={getAble1(2)} setOff={setM} isActive={props.isActive} setStatus={setStatus} />
                <ChemistryCard off={getAble(3)} setOff={setM} statusOff={getAble1(3)} setStatus={setStatus}/>
                <IoTCard off={getAble(4)} setOff={setM} statusOff={getAble1(4)} setStatus={setStatus}/>
                <EconomicCard off={getAble(5)} setOff={setM} statusOff={getAble1(5)} setStatus={setStatus}/>

            </Container>
        )
        }
        </ThemeContextConsumer>
    );
} export default ContentDashboard;