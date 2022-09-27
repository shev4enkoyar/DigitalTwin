import './CardModels.css';
import { Row, Col, Container, Card } from 'react-bootstrap';
import CardsModels from './CardsModels';
import AddingButton from '../Button/AddingButton';
import { ThemeContextConsumer } from '../ThemeContext';
import { Link } from "react-router-dom"
import ButtonEdit from '../Button/ButtonEdit';
import plus from './../Data/plusForButtonAdding.svg';
function ModelsCont(props) {
    
    return (
        <ThemeContextConsumer>{context => (
            <Container>
                <Container className="ContForH"><p className={context.theme + "Gray textForH"}>Модели {props.culture.length}/15</p>
                    <p className={context.theme + "Gray textForH"}>Общая площадь 1234/5000</p></Container>
                <CardsModels culture={props.culture} />
                    <Link to={'/createModel'} style={{ padding:'0px', display:'flex',justifyContent:'center' }}>
                    <ButtonEdit className="blueBut createBut" textForButton="Новая модель" classTextName="textOpenSans14" image={plus} imageClassName="plus"/>
                    </Link>
            </Container>)}
        </ThemeContextConsumer>
    )
} export default ModelsCont;