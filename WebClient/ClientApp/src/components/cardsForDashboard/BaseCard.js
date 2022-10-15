import './CardsForDashboard.css';
import { Container, Col, Row } from 'react-bootstrap';
import CardForBody from './../cardForBody/CardForBody';
const BaseCard=(props)=> {
    return (
        <fieldset className="cardSize my-5" style={{ visibility: props.visible ? "visible" : "hidden", position: 'inherit' }}>
            <CardForBody classForContB="p-3">
                <Container className="ContForCardDash">
                    <p className="textForStatus" >
                        {props.hText}
                    </p>
                    <p className="NeedingText" style={{ color: props.notifyColor }}>
                        {props.descr}
                        <Col style={{ margin: '6px 0px 6px 45px', display: 'flex', justifyContent: 'flex-end' }}>
                            {props.isBut}
                        </Col>
                    </p>
                    {props.children}
                </Container>
            </CardForBody>
        </fieldset>
    )
}
export default BaseCard;