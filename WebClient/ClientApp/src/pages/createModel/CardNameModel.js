import React from 'react';
import { Button } from "reactstrap/lib";
import CardForBody from '../../components/cardForBody/CardForBody.js';
import Combobox from '../../components/combobox/ComboBox.js';
import Input from '../../components/input/Input.js';
const CardNameModel = (props) => {
    const isPred = ["Да", "Нет",]

    return (
        <fieldset style={{ visibility: props.visible ? "visible" : "hidden", minWidth: '360px', width: 'calc(25% - 20px)', position: 'inherit' }} className="mx-auto my-5">
            <CardForBody className="signUpWidth" classForContB="d-flex flex-column align-items-center p-4">
                <h5 style={{ fontFamily: 'Open Sans', margin: '10px 0px 30px 0px' }} className="d-flex text-center">
                    Формирование технологической карты
                </h5>
                <Input value={props.values.name} onInput={(event) => { var reg = /^[0-9A-Za-zА-Яа-я]*$/i.test(event.target.value); if (reg) props.setStatus({ name: event.target.value.trim() }) }} className="input" classNameP="textForSign" Label="Наименование модели" placeholder="Введите наименование..." />
                <Combobox onChange={(empty) => { props.setStatus({ pred: empty }) }} className="FormControlSelect minWForCombobox" classTextCombobox="textForSign" textCombobox="Был ли ранее предшественник?" options={isPred} />
                <Button onClick={() => { if (props.values.name) props.onClick() }} className="btn btn-primary " style={{ width: "190px" }}>
                    Далее
                </Button>
                <div className="text-center">
                    <a style={{ color: '#F5CA5D', textDecoration: 'auto', fontSize: '85%' }} href="/models">
                        Вернуться к моделям
                    </a>
                </div>
            </CardForBody>
        </fieldset>
    )
}
export default CardNameModel;