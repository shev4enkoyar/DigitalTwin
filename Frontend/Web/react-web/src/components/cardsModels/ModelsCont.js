import './CardModels.css';
import { Row, Col, Container, Card } from 'react-bootstrap';
import CardsModels from './CardsModels';
import { ThemeContextConsumer } from '../ThemeContext';
import { Link } from "react-router-dom"
import ButtonEdit from '../button/ButtonEdit';
import plus from './../data/plusForButtonAdding.svg';
function ModelsCont(props) {
    
    return (
        <ThemeContextConsumer>{context => (
            <>
                <Container className="ContForH">
                    <p className={context.theme + "Gray textForH"}>
                    Модели {props.culture.length}/15
                    </p>
                    <p className={context.theme + "Gray textForH"}>
                        Общая площадь 1234/5000
                    </p>
                </Container>
                <CardsModels culture={props.culture}>
                    <Link to={'/createModel'} style={{ padding: '0px', display: 'flex', justifyContent: 'center', maxWidth: '100%' }}>
                        <ButtonEdit className="blueBut createBut" textForButton="Новая модель" classTextName="textOpenSans14" image={plus} imageClassName="plus" />
                    </Link>
                </CardsModels>
            </>
        )}
        </ThemeContextConsumer>
    )
} export default ModelsCont;