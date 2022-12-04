import React from "react";
import { Card } from "reactstrap";
import './Tarif.css';
function Tarif(props) {
        let rows = [];
        /*props.data["possibility"].forEach((item, i) => rows.push(<li key={item + i}>{item}</li>));*/
        /*const myList = (
            <ul className="text" id="tarifUL" >
                {rows}
            </ul>
        );*/
    return (
        <Card className={props.light + " BorderForCard " + props.light + " TarifCard px-5"}>
            {props.children}
            {/*{myList}*/}
        </Card>
    );
} export default Tarif;