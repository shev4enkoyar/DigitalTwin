import React, { Fragment, useEffect, useState } from 'react';
import {
    Dropdown, DropdownItem, DropdownMenu, DropdownToggle
} from 'reactstrap';
import { Col, Row } from "reactstrap/lib";
import { Button } from "rsuite";
import './../../../../pages/pages.css';
import { ClientRoutes } from "../../../../util/ClientRoutes";
import authService from "../../../api-authorization/AuthorizeService";
import { ThemeContextConsumer } from "../../../ThemeContext";
import { NotificationType } from "./util/NotificationType";

function NotificationDropdown({ direction, ...args }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifications, setNotifications] = useState(null);

    useEffect( () => {
        let array;
        async function fetchData() {
            array = await GetNotifications();
            setNotifications(array);
        }
        fetchData();
    }, [])

    const toggle = () => setDropdownOpen((prevState) => !prevState);

    let content = notifications === null || notifications === undefined
        ?
        <DropdownItem className="text-center">Уведомлений нет</DropdownItem>
        :
        this.state.notifications.map((el, index) => {
            if (el.Type === NotificationType.INVITE){
                let links = el.RedirectLink.split(';');
                return (
                    <Fragment key={index}>
                        <DropdownItem>
                            {el.Message}
                            <Row >
                                <Col className="d-flex justify-content-end" >
                                    <Button onClick={() => FetchLink(ClientRoutes.PREFIX + links.at(0))}>
                                        Да
                                    </Button>
                                </Col>
                                <Col className="d-flex justify-content-start">
                                    <Button onClick={() => FetchLink(ClientRoutes.PREFIX + links.at(1))}>
                                        Нет
                                    </Button>
                                </Col>
                            </Row>
                        </DropdownItem>
                    </Fragment>
                )
            } else {
                return (
                    <DropdownItem href={ClientRoutes.PREFIX + el.RedirectLink} key={index}>
                        {el.Message}
                    </DropdownItem>
                )
            }
        });

    return (
        <ThemeContextConsumer>
            {context => (
                <Dropdown isOpen={dropdownOpen} toggle={toggle} direction={direction}>
                    <DropdownToggle color="transparent" caret>
                        <img className={context.theme + "Icon" + " icon"} src="https://icons.getbootstrap.com/assets/icons/bell-fill.svg" />
                    </DropdownToggle>
                    <DropdownMenu {...args} id="notif">
                        {content}
                    </DropdownMenu>
                </Dropdown>
            )}
        </ThemeContextConsumer>
    );

    const FetchLink = async (link) => {
        const token = await authService.getAccessToken();
        await fetch(link, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
    }

    const GetNotifications = async () => {
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
        return data;
    }
}


export default NotificationDropdown;