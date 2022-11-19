import React from "react";
import authService from "../../../components/api-authorization/AuthorizeService";
import {Container, Row} from "reactstrap";
import BaseCard from "./BaseCard";
import Input from "../../../components/input/Input";
const EconomicCard = (props) => {
    const CreateTechCard = async (digitalModel) => {
        const token = await authService.getAccessToken();
        let response = null;
        if (digitalModel.Cadaster === "" && digitalModel.CategoryName === "")
            await fetch(`api/techcard/create?name=${digitalModel.Name}&productId=${digitalModel.ProductId}`, {
                headers: !token ? {} :
                    {
                        'Authorization': `Bearer ${token}`,
                    }
            });
        else
            await fetch(`api/techcard/create?name=${digitalModel.Name}&productId=${digitalModel.ProductId}&cadaster=${digitalModel.Cadaster}&categoryName=${digitalModel.CategoryName}`, {
                headers: !token ? {} :
                    {
                        'Authorization': `Bearer ${token}`,
                    }
            });
        return await response.text();
    }
    const warning = () => {
        if ((props.values.eZasev.length > 0) && (props.values.eObrabotka.length > 0) && (props.values.eSbor.length > 0)) {
            return "Данные об экономических показателях сохранены";
        }
        else {
            return (((props.values.eZasev.length > 0) ? "" : "Требуется добавить работы по засеву\n") + ((props.values.eObrabotka.length > 0) ? "" : "Требуется добавить работы по обработке\n") + ((props.values.eSbor.length > 0) ? "" : "Требуется добавить работы по сбору\n"))
        }
    }
    return (
        <BaseCard className="widForCardWithTable" visible={props.visible} off={props.off} hText="Статус тех.карты" descr={warning()} notifyColor="#DC3545" >
            <Container style={{ display: 'flex', justifyContent: 'center', padding: '0px', margin: '0px 0px 0.5rem 0px', width: '100%' }}>
                <button onClick={() => { props.setStatus({ isActive: true }) }} className="btn btn-warning my-2" style={{ width: "190px" }} >
                    Выбрать
                </button>
            </Container>
            <Container className="contButtonBCard">
                <Row className="mx-2">
                    <button onClick={() => { props.Back() }} className="btn btn-primary mr-2 my-2">
                        Назад
                    </button>
                </Row>
                <button className="btn btn-primary m-2"  onClick={() => {
                    let digitalModel = {
                        Name: props.data.at(0).name,
                        UserId: -1,
                        ProductId: props.data.at(2).productId,
                        Cadaster: props.data.at(3).kad,
                        CategoryName: props.data.at(2).cult + " " + props.data.at(2).sort
                    };
                    console.log(CreateTechCard(digitalModel));
                    props.onClick();
                }}>
                    <a style={{
                        color: "#fff", textDecoration: 'none'}} href="/models">
                            Создать модель
                    </a>
                </button>
            </Container>
        </BaseCard>
    )


}
export default EconomicCard;