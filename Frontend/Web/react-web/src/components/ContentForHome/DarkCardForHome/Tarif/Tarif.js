import './Tarif.css';
import { Card } from 'react-bootstrap';
import { ThemeContextConsumer } from "../../../ThemeContext";
function Tarif(props) {
        let rows = [];
        props.data["possibility"].forEach((item, i) => rows.push(<li key={item + i}>{item}</li>));
        const myList = (
            <ul className="text" id="tarifUL" >
                {rows}
            </ul>
        );
    return (
        <Card className={props.light +"BorderForCard " + props.light+ " TarifCard"}>
            <h4 className={props.light+ " text"}>{props.data["name"]}</h4>
            <p className={props.light+ " text"}>{props.data["cost"]}</p>
            {myList}
                </Card>
    );
} export default Tarif;