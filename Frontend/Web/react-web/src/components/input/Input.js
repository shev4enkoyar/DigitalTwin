import './Input.css';
import { Card, Container } from 'react-bootstrap';
function Input(props) {
    return (
        <Container className={props.contClass}>
            <p className={props.classNameP}>
                {props.Label}
            </p>
            <input onChange={props.onChange} onInput={props.onInput} value={props.value} className={props.className} placeholder={props.placeholder}/>
        </Container>

    );
} export default Input;