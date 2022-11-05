import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Label, Input, FormGroup } from 'reactstrap';
import { Col, Container, Row } from "reactstrap/lib";
import authService from "../../components/api-authorization/AuthorizeService";
import CardForBody from "../../components/cardForBody/CardForBody";
import { ThemeContextConsumer } from "../../components/ThemeContext";
import { functionalConverter } from "../../util/functionalConverter";
import SideBarDashboard from "../../components/sideBarDashboard/SideBarDashboard";
import { IconButton } from "../../components/sideBarDashboard/util/IconButton";
import './../../pages/pages.css';
import { LoadingFragment } from "../../util/LoadingFragment";

class Docs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            docs: [{ "name": "Отчет", "type": "doc", "link": "https://somepath_to_doc" },
            { "name": "Отчет", "type": "xls", "link": "https://somepath_to_doc" },
            { "name": "Отчет", "type": "doc", "link": "https://somepath_to_doc" },
            { "name": "Отчет", "type": "xls", "link": "https://somepath_to_doc" },
            { "name": "Отчет", "type": "xls", "link": "https://somepath_to_doc" },
            { "name": "Отчет", "type": "xls", "link": "https://somepath_to_doc" },
            { "name": "Отчет", "type": "xls", "link": "https://somepath_to_doc" },
            { "name": "Отчет", "type": "doc", "link": "https://somepath_to_doc" },
            { "name": "Отчет", "type": "pdf", "link": "https://somepath_to_doc" },], loading: false,
            icons: [
                { "doc": "https://www.svgrepo.com/show/255810/doc.svg" },
                { "xls": "https://www.svgrepo.com/show/255829/xls.svg" },
                { "pdf": "https://www.svgrepo.com/show/255818/pdf.svg" },
            ]
        };
    }

    docs = [
        { "name": "Отчет", "type": "doc", "link": "https://somepath_to_doc" },
        { "name": "Отчет", "type": "xls", "link": "https://somepath_to_doc" },
        { "name": "Отчет", "type": "doc", "link": "https://somepath_to_doc" },
        { "name": "Отчет", "type": "xls", "link": "https://somepath_to_doc" },
        { "name": "Отчет", "type": "doc", "link": "https://somepath_to_doc" },
        { "name": "Отчет", "type": "pdf", "link": "https://somepath_to_doc" },
    ]


    /* componentDidMount() {
         this.setState({
             docs: docs
         }, this.setState({
                 loading: false
         }))
         //this.GetAllTariffsData();
     }*/

    iconsSideBarDashboard = [
        new IconButton("/dashboard/" + this.props.match.params.modelId, "Главная панель",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/map/" + this.props.match.params.modelId, "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/docs", "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("#nogo", "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/recom", "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("#nogo", "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("#nogo", "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/models", "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ]

    docsIcons = [
        {"doc": "https://www.svgrepo.com/show/255810/doc.svg"},
        {"xls": "https://www.svgrepo.com/show/255829/xls.svg"},
        {"pdf": "https://www.svgrepo.com/show/255818/pdf.svg"},
    ]

    render() {
        let content =
            this.state.docs.map(el => {
                return (
                    <ThemeContextConsumer>
                        {context => (
                            <Col md={3} className="mb-5 d-flex justify-content-center p-0">
                                <CardForBody styleForCard={{ width: "fit-content", height: "100%", padding: "0 5%", cursor: "pointer" }}>
                                    <Container className="text-center mt-4">
                                        <img style={{ width: "50px", height: "50px" }}
                                            src={el.type === "doc" ? "https://www.svgrepo.com/show/255810/doc.svg" : el.type === "xls" ? "https://www.svgrepo.com/show/255829/xls.svg" : "https://www.svgrepo.com/show/255818/pdf.svg"} />

                                    </Container>
                                    <h4 className={context.theme + " text-center mt-4"} style={{ color: "#fff", fontSize: "18px"}}>
                                        {el.name}
                                        {this.state.icons.doc}
                                    </h4>
                                </CardForBody>
                            </Col>
                        )}
                    </ThemeContextConsumer>
                )
            });
        return (
            <ThemeContextConsumer>
                {context => (
                    this.state.loading
                        ? <LoadingFragment fullscreen={true} />
                        : <Container className={context.theme + "Gray d-flex justify-content-center w-100"} fluid>
                            <SideBarDashboard block={false} icons={this.iconsSideBarDashboard}></SideBarDashboard>
                            <Row className={context.theme + "Gray mt-3 ml-5 d-flex justify-content-between w-90"}>
                                {content}
                            </Row>
                        </Container>
                )
                }
            </ThemeContextConsumer>
        );
    }

    async GetAllTariffsData() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/subscriptions/get_all', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        data.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
        this.setState({ docs: data, loading: false });
    }
}

export default Docs;