import './Input.css';
import { Card, Container } from 'react-bootstrap';
function Input(props) {
    return (
        <Container >
            <p className="textForSign">{props.Label}</p>
            <input className="input" placeholder={props.placeholder}></input>
            </Container>

    );
} export default Input;