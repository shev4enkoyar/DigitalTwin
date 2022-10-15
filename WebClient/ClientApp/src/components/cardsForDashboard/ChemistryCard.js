import './CardsForDashboard.css';
import { Container,Button } from 'react-bootstrap';
import BaseCard from "./BaseCard";
const ChemistryCard = (props) => {
    return (
        <BaseCard visible={props.visible} off={props.off} hText="Статус модели" descr="Требуется добавить данные о химических средствах!" notifyColor="#DC3545" >
            <Container className="contButton">
                <Button className="btn btn-primary my-2" style={{ width: "190px" }} onClick={() => { if (props.values.chem) props.onClick() }}>
                    Далее
                </Button>
            </Container>
        </BaseCard>
    )
}
export default ChemistryCard;