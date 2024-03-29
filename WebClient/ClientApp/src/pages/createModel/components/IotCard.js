﻿import React from "react";
import { Button } from "reactstrap/lib";
import BaseCard from "./BaseCard";
import './CardsForDashboard.css';
const IotCard = (props) => {
    return (
        <BaseCard visible={props.visible} off={props.off} hText="Статус тех.карты" descr="Нет ни одного датчика!" notifyColor="#E2891F"
            isBut={<Button onClick={() => { props.setStatus({ dat: true }) }} className="btn btn-danger ButAllMini">
                <img style={{ width: "25px", height: "25px" }} className="icon"
                    src="https://img.icons8.com/windows/344/sensor.png" />
            </Button>} >
             <Button className="btn btn-primary my-2" style={{ width: "190px" }} onClick={() => { if (props.values.dat) props.onClick() }}>
                Далее
             </Button>
        </BaseCard>
    )
}
export default IotCard;