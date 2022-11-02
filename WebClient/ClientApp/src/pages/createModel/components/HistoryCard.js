import React from "react";
import BaseCard from "./BaseCard";
import './CardsForDashboard.css';
const HistoryCard = (props) => {
    return (
        <BaseCard visible={props.visible} hText="Статус тех.карты" descr="Требуется добавить исторические данные!" notifyColor="#DC3545" off={props.off}>
            <button className="btn btn-primary my-2" style={{ width: "190px" }}>
                    Импортировать
            </button>
            <div className="Warning" style={{ paddingTop: '7px' }}>Файл импорта должен соответсвовать &zwnj;
                <a style={{ color: '#F5CA5D', textDecorationLine: 'none' }} href="src/pages/createModel/components/HistoryCard#nogo">
                    шаблону
                </a>
            </div>
            <p className="textForStatus marForDescr" >
                Если модель не имеет исторических данных, нажмите “Начальное состояние”
            </p>
            <button className="btn btn-danger my-2" style={{ width: "190px" }}>
                    Начальное состояние
            </button>
            <button onClick={props.onClick} className="btn btn-primary my-2" style={{ width: "190px" }} >
                Далее
            </button>
        </BaseCard>
    )
}
export default HistoryCard;