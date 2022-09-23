import './CardModels.css';
import { Row, Col, Container, Card } from 'react-bootstrap';
import CardsModels from './CardsModels';
import AddingButton from '../Button/AddingButton';
import { ThemeContextConsumer } from '../ThemeContext';
import { Link } from "react-router-dom"
function ModelsCont(props) {
    
    return (
        <ThemeContextConsumer>{context => (
            <Container>
                <Container className="ContForH"><p className={context.theme + "Gray textForH"}>Модели {props.culture.length}/15</p>
                    <p className={context.theme + "Gray textForH"}>Общая площадь 1234/5000</p></Container>
                <CardsModels culture={props.culture} />
                <Container className="ContForButton">
                    <Link to={'/create_model'} style={{ padding:'0px', display:'flex',justifyContent:'center' }}>
                        <AddingButton textForButton="Новая модель" ClassName="changeButtonForModelButton" />
                        </Link>
                </Container>
            </Container>)}
        </ThemeContextConsumer>
                )
} export default ModelsCont;