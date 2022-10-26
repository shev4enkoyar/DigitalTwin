import React, {Component, Fragment} from "react";
import DropdownButton from "react-bootstrap/DropdownButton";
import {HubConnectionBuilder, JsonHubProtocol} from "@microsoft/signalr";
import ServerLinks from "../../../util/ServerLinks";
import Dropdown from "react-bootstrap/Dropdown";
import {NotificationType} from "./util/NotificationType";
import {Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {ClientRoutes} from "../../../util/ClientRoutes";
import authService from "../../api-authorization/AuthorizeService";
import {NotificationManager} from "react-notifications";
import { ThemeContextConsumer } from './../../ThemeContext';
export class NotificationDropDown extends Component{
    constructor(props) {
        super(props);
        this.state = { notifications: []};
    }

    componentDidMount() {
        this.GetNotifications();
        this.populateConnection();
    }

    render() {
        let content = this.state.notifications.length === 0
                ?
                    <Dropdown.Item>Уведомлений нет</Dropdown.Item>
                :
                    this.state.notifications.map((el, index) => {
                        if (el.Type === NotificationType.INVITE){
                            let links = el.RedirectLink.split(';');
                            return (
                                <Fragment key={index}>
                                    <Dropdown.Item>
                                        {el.Message}
                                        <Row >
                                            <Col className="d-flex justify-content-end" >
                                                <Button onClick={() => this.FetchLink(ClientRoutes.PREFIX + links.at(0))}>
                                                    Да
                                                </Button>
                                            </Col>
                                            <Col className="d-flex justify-content-start">
                                                <Button onClick={() => this.FetchLink(ClientRoutes.PREFIX + links.at(1))}>
                                                    Нет
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Dropdown.Item>
                                </Fragment>
                            )
                        } else {
                            return (
                                <Dropdown.Item href={ClientRoutes.PREFIX + el.RedirectLink} key={index}>
                                    {el.Message}
                                </Dropdown.Item>
                            )
                        }
                    })
        return (
          <ThemeContextConsumer>
                {context => (
                    <DropdownButton
                        className="background-transparent"
                        id="dropdown-basic-button"
                        title={<img className={context.theme + "Icon" + " icon"} src="https://icons.getbootstrap.com/assets/icons/bell-fill.svg" />}>
                        {content}
                    </DropdownButton>
                )}
          </ThemeContextConsumer>
        );
    }

    async FetchLink(link) {
        const token = await authService.getAccessToken();
        await fetch(link, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
    }

    async GetNotifications() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/notification/get_all', {
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
        this.setState({ notifications: data });
    }

    populateConnection() {
        const newConnection = new HubConnectionBuilder()
            .withUrl(ServerLinks.WEBCLIENT_SIGNALR_HUB)
            .withAutomaticReconnect()
            .withHubProtocol(new JsonHubProtocol())
            .build();
        newConnection.on('Recive', message => {
            let notifications = this.state.notifications;
            notifications.push(message);
            NotificationManager.info(message.Message);
            this.setState({notifications })
        })
    }
}