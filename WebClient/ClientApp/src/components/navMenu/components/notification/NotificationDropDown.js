import React, {Component, Fragment} from "react";
import {HubConnectionBuilder, JsonHubProtocol} from "@microsoft/signalr";
import ServerLinks from "../../../../util/ServerLinks";
import {NotificationType} from "./util/NotificationType";
import {Link} from "react-router-dom";
import {ClientRoutes} from "../../../../util/ClientRoutes";
import authService from "../../../api-authorization/AuthorizeService";
import {NotificationManager} from "react-notifications";
import { ThemeContextConsumer } from '../../../ThemeContext';
import RenderProfileContent from "../profile/renderProfileContent";
import {Button, Whisper} from "rsuite";
import RenderNotificationContent from "./RenderNotificationContent";
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

        return (
          <ThemeContextConsumer>
                {context => (
                    /*<DropdownButton
                        className="background-transparent"
                        id="dropdown-basic-button"
                        title={<img className={context.theme + "Icon" + " icon"} src="https://icons.getbootstrap.com/assets/icons/bell-fill.svg" />}>
                        {content}
                    </DropdownButton>*/
                    <Whisper placement="bottomStart" trigger="click" speaker={RenderNotificationContent}>
                        <Button className="background-transparent">
                            <img className={context.theme + "Icon" + " icon"} src="https://icons.getbootstrap.com/assets/icons/bell-fill.svg" />
                        </Button>

                    </Whisper>
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
            NotificationManager.info(message.Message);
        })
    }
}