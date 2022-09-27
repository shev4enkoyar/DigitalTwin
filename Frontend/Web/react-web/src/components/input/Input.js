import './Input.css';
import { Card, Container } from 'react-bootstrap';
function Input(props) {
    return (
        <Container className={props.contClass}>
            <p className={props.classNameP}>{props.Label}</p>
            <input className={props.className}  placeholder={props.placeholder}></input>
            </Container>

    );
} export default Input;