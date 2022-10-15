import './CardsForDashboard.css';
import { Button, Container } from 'react-bootstrap';
import BaseCard from "./BaseCard";
const EconomicCard = (props) => {
    return (
        <BaseCard visible={props.visible} hText="Статус модели" descr="Требуется добавить данные экономических показателей!" notifyColor="#DC3545">
            <Button className="btn btn-primary my-2" style={{ width: "190px" }} >
                <a style={{ color: "#fff" }} href={'/dashboard'}>
                    Далее
                </a>
            </Button>
        </BaseCard>
    )
}
export default EconomicCard;