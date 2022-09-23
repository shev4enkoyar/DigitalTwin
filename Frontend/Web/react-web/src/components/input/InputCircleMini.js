import './Input.css';
import { Card, Container } from 'react-bootstrap';
function InputCircleMini(props) {
    return (
        <Container style={{margin:'0px 0px 10px 0px'} }>
            <p className="textForInpCircle">{props.Label}</p>
            <input className="inputCircleMini"></input>
            </Container>

    );
} export default InputCircleMini;