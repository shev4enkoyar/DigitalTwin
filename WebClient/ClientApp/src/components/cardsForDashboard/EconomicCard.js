import './CardsForDashboard.css';
import { Button, Container } from 'react-bootstrap';
import BaseCard from "./BaseCard";
import React, {useState} from "react";
import authService from "../api-authorization/AuthorizeService";
import axios from "axios";
const EconomicCard = (props) => {
    const CreateTechCard = async (digitalModel) => {
        const token = await authService.getAccessToken();
        let response = null;
        await fetch(`api/techcard/create?name=${digitalModel.Name}&productId=${digitalModel.ProductId}`, {
            headers: !token ? {} :
                {
                    'Authorization': `Bearer ${token}`,
                }
        });
        return await response.text();
    }
    return (
        <BaseCard visible={props.visible} hText="Статус модели" descr="Требуется добавить данные экономических показателей!" notifyColor="#DC3545">
            <Button className="btn btn-primary my-2" style={{ width: "190px" }} onClick={() => {
                let digitalModel = {
                    Name: props.data.at(0).name,
                    UserId: -1,
                    ProductId: props.data.at(2).productId
                };
                console.log(CreateTechCard(digitalModel));
            }}>
                <a style={{ color: "#fff" }} href={'/models'}>
                    Создать модель
                </a>
            </Button>
        </BaseCard>
    )


}
export default EconomicCard;