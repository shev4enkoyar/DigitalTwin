import './CardsForDashboard.css';
import React, { useEffect } from "react";
import BaseCard from "./BaseCard";
import { Container, Row } from "reactstrap";
import authService from "../../../components/api-authorization/AuthorizeService";
const WorkerCard = (props) => {
    const CreateTechCard = async (digitalModel) => {
        const token = await authService.getAccessToken();
        let response = null;
        if (digitalModel.Cadaster === "" && digitalModel.CategoryName === "")
            response=await fetch(`api/techcard/create?name=${digitalModel.Name}&productId=${digitalModel.ProductId}`, {
                headers: !token ? {} :
                    {
                        'Authorization': `Bearer ${token}`,
                    }
            });
        else
            response=await fetch(`api/techcard/create?name=${digitalModel.Name}&productId=${digitalModel.ProductId}&cadaster=${digitalModel.Cadaster}&categoryName=${digitalModel.CategoryName}`, {
                headers: !token ? {} :
                    {
                        'Authorization': `Bearer ${token}`,
                    }
            });
        let id = await response.json();
        props.setId(id);
        console.log('modelId',id);
        const queryDol = await fetch('api/worker/get_posts', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        let dols = await queryDol.json();
        props.data[5].rZasev.map(async el => {
            const dol= dols.find(dol => dol.post === el.dol);
            const queryWorkers = await fetch(`api/worker/create?modelId=${id}&postId=${dol.id}&fio=${el.vak}&rate=${el.stavk}&salary=${el.oklad}`, {
                headers: !token ? {} :
                    {
                        'Authorization': `Bearer ${token}`,
                    }
            });
            const data = await queryWorkers.text();
            console.log(data);
        });
        props.data[5].rObrabotka.map(async el => {
            const dol = dols.find(dol => dol.post === el.dol);
            const queryWorkers = await fetch(`api/worker/create?modelId=${id}&postId=${dol.id}&fio=${el.vak}&rate=${el.stavk}&salary=${el.oklad}`, {
                headers: !token ? {} :
                    {
                        'Authorization': `Bearer ${token}`,
                    }
            });
            const data = await queryWorkers.text();
            console.log(data);
        });
        props.data[5].rSbor.map(async el => {
            const dol = dols.find(dol => dol.post === el.dol);
            const queryWorkers = await fetch(`api/worker/create?modelId=${id}&postId=${dol.id}&fio=${el.vak}&rate=${el.stavk}&salary=${el.oklad}`, {
                headers: !token ? {} :
                    {
                        'Authorization': `Bearer ${token}`,
                    }
            });
            const data = await queryWorkers.text();
            console.log(data);
        });
    }
    
    const warning = () => {
        if ((props.values.rZasev.length > 0) && (props.values.rObrabotka.length > 0) && (props.values.rSbor.length > 0)) {
            return "Данные о работниках сохранены";

        }
        else {
            console.log(((props.values.rZasev.length > 0) ? "" : "Требуется добавить работников для засева\n") + ((props.values.rObrabotka.length > 0) ? "" : "Требуется добавить работников для обработки\n") + ((props.values.rSbor.length > 0) ? "" : "Требуется добавить работников для сбора\n"))
            return (((props.values.rZasev.length > 0) ? "" : "Требуется добавить работников для засева\n") + ((props.values.rObrabotka.length > 0) ? "" : "Требуется добавить работников для обработки\n") + ((props.values.rSbor.length > 0) ? "" : "Требуется добавить работников для сбора\n"))
        }
    }
    return (
        <BaseCard className="widForCult" visible={props.visible} off={props.off} hText="Статус тех.карты" descr={warning()} notifyColor="#DC3545" >
            <Container style={{ display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                <button onClick={() => { props.setStatus({ isActive: true })  }} className="btn btn-warning my-2" style={{ width: "190px" }} >
                    Выбрать
                </button>
            </Container>
            <Container className="contButtonBCard">
                <Row className="mx-2">
                    <button onClick={() => { props.Back() }} className="btn btn-primary my-2 mr-2" style={{ width: "max-content" }} >
                        Назад
                    </button>
                </Row>
                <button className="btn btn-primary m-2" onClick={() => {
                    let digitalModel = {
                        Name: props.data.at(0).name,
                        UserId: -1,
                        ProductId: props.data.at(2).productId,
                        Cadaster: props.data.at(3).kad,
                        CategoryName: props.data.at(2).cult + " " + props.data.at(2).sort

                    };
                    CreateTechCard(digitalModel);
                }}>
                    <a style={{
                        color: "#fff", textDecoration: 'none'
                    }} href="/models" >
                        Создать модель
                    </a>
                </button>
            </Container>
        </BaseCard>
    )
}
export default WorkerCard;