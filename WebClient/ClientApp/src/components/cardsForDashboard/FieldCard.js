import Input from '../input/Input';
import './CardsForDashboard.css';
import { Container, Button } from 'react-bootstrap';
import BaseCard from "./BaseCard";
const FieldCard = (props) => {
    return (
        <BaseCard visible={props.visible} off={props.statusOff} hText="Статус модели" descr="Требуется добавить данные о поле!" notifyColor="#DC3545"
            isBut={
                <Button className="blueBut ButAllMini" >
                    <img style={{ width: "25px", height: "25px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />
                </Button>
            }>
            <Container style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'flex-end', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                <Input className="inpCreateForDashCard" Label="Кадастровый номер" classNameP="textForSign12" onInput={(event) => { var reg = /^[0-9]*$/i.test(event.target.value); if (reg) props.setStatus({ kad: event.target.value.trim() }) }} value={props.values.kad} />
            </Container>
            <Container className="contButton">
                <Button className="btn btn-primary my-2" style={{ width: "190px" }} onClick={() => { if (props.values.kad) props.onClick() }} >
                    Далее
                </Button>
            </Container>
        </BaseCard>
    )
}
export default FieldCard;