import './CardsForDashboard.css';
import { Container, Button } from 'react-bootstrap';
import BaseCard from "./BaseCard";
const TransportCard = (props) => {
    return (
        <BaseCard visible={props.visible} off={props.off} hText="Статус модели" descr="Требуется добавить технику!" notifyColor="#DC3545" >
            <Container style={{ display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                <Button onClick={() => { props.handleActiveChanged(true) }} className="btn btn-primary my-2" style={{ width: "190px" }} >
                    Выбрать
                </Button>
            </Container>
            <Container className="contButton">
                <Button className="btn btn-primary my-2" style={{ width: "190px" }} onClick={() => { if (props.values.added) props.onClick() }}>
                    Далее
                </Button>
            </Container>
        </BaseCard>
    )
}
export default TransportCard;