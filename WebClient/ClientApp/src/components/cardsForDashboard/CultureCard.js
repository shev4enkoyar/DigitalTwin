import Input from '../input/Input';
import './CardsForDashboard.css';
import { Container, Col, Button } from 'react-bootstrap';
import Combobox from "./../combobox/ComboBox";
import BaseCard from "./BaseCard";
const  CultureCard = (props) => {
    const cult = ["Введите наименование культуры...", "Рис", "Овес"]
    const sortForCult = ["Введите сорт культуры...", "cc"]
    const isFull = () => {
        if (props.values === null || props.values === undefined) {
        }
        return !Object.keys(props.values).map(val => props.values[val]).some(function (value, index, array) { return (value === false || value === 0 || value === "" || value === undefined) })
    }
    return (
        <BaseCard visible={props.visible} hText="Статус модели" descr="Требуется добавить данные о культуре!" notifyColor="#DC3545" off={props.off}>
            <Container className="p-0 d-flex flex-wrap" style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Col className="px-1">
                    <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Культура" classNameCont="padCombobox " options={cult} onChange={(empty) => { props.setStatus({ cult: empty }) }} />
                    <Input Label="Фракция" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={props.values.frac} onInput={(event) => { var reg = /^[0-9A-Za-zА-Яа-я]*$/i.test(event.target.value); if (reg) props.setStatus({ frac: event.target.value.trim() }) }} />
                    <Input Label="Норма высева" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) props.setStatus({ norm: event.target.value.trim() }) }} value={props.values.norm} />
                </Col>
                <Col className="px-1">
                    <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Сорт" classNameCont="padCombobox " options={sortForCult} onChange={(empty) => { props.setStatus({ sort: empty }) }} />
                    <Input Label="Густота" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) props.setStatus({ gust: event.target.value.trim() }) }} value={props.values.gust} />
                    <Input Label="Вес этапов" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) props.setStatus({ total: event.target.value.trim() }) }} value={props.values.total} />
                </Col>
            </Container>
            <Button onClick={() => { if (isFull() == true) props.onClick(); console.log(isFull()) }} className="btn btn-primary my-2" style={{ width: "190px" }} >
                Далее
            </Button>
        </BaseCard>
    )
}
export default CultureCard;

