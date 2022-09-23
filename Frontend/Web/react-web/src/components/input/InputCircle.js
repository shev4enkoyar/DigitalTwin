import './Input.css';
import { Card, Container } from 'react-bootstrap';
function InputCircle(props) {
    return (
        <Container style={{margin:'0px 0px 10px 0px'} }>
            <p className="textForInpCircle">{props.Label}</p>
            <input className="inputCircle"></input>
            </Container>

    );
} export default InputCircle;