import {NotificationType} from "./util/NotificationType";
import React, {Fragment, useEffect, useState} from "react";
import {Button, Dropdown, Popover} from "rsuite";
import {ClientRoutes} from "../../../../util/ClientRoutes";
import {Col, Row} from "reactstrap/lib";
import authService from "../../../api-authorization/AuthorizeService";

const RenderProfileContent = ({ onClose, left, top, className, ...rest }, ref) => {
    const [notifications, setNotifications] = useState(null);

    useEffect( () => {
        let array;
        async function fetchData() {
            array = await GetNotifications();
            setNotifications(array);
        }
        fetchData();
    }, [])

    let content = notifications === null || notifications === undefined
        ?
            <Dropdown.Item className="text-center">Уведомлений нет</Dropdown.Item>
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
            });

    const handleSelect = eventKey => {
        onClose();
        console.log(eventKey);
    };
    return(
        <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
                {content}
            </Dropdown.Menu>
        </Popover>
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

};

export default RenderProfileContent;