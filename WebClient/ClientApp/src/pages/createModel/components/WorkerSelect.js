import React, { useState, useEffect } from 'react';
import PopUpWithBlurCanvas from "../../../components/popUp/PopUpWithBlurCanvas";
import TabForWorkers from './TabForWorkers';
import authService from "./../../../components/api-authorization/AuthorizeService";
import './../../pages.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Button } from "reactstrap";
const WorkerSelect = (props) => {
    const [state, setState] = useState({ activeTab: '1' });
    const toggle = (tab) => {
        if (state.activeTab !== tab) {
            setState({
                activeTab: tab
            });
        }
    }
    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const token = await authService.getAccessToken();
                const response = await fetch('api/worker/get_posts', {
                    headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
                });
                console.log(33333);
                const data = await response.json();
                console.log(11111);
                console.log(data);
                let workerTemp = [];
                workerTemp.push({ id: -1, post: "Выберите должность..." });
                data.map(el => workerTemp.push(el));
                console.log(workerTemp);
                if (mounted) {
                    /*handleSelectWorker({ workers: workerTemp });*/
                    props.setStatus({dols:workerTemp});
                }

            } catch (e) {
                console.log(e);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);
    return (
        <PopUpWithBlurCanvas isBlur={true} isActive={props.values.isActive} handleActiveChange={() => { props.setStatus({ isActive: false }) }} className="TranspCard" styleFlex={{ top: '0px!important', marginTop: '0px', margin: 'auto' }} >
            <Container style={{ padding: '0px' }}>
                <Button onClick={() => { props.setStatus({ isActive: false }) }} className="btn btn-danger position-absolute" style={{ right: '3px', top: '2px' }}>
                    x
                </Button>
                <Nav tabs className="justify-content-center">
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '1'? "active" : ""}
                            onClick={() => { toggle('1'); }}
                        >
                            Работники для засева
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '2' ? "active" : ""}
                            onClick={() => { toggle('2'); }}
                        >
                            Работники для обработки
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '3' ? "active" : ""}
                            onClick={() => { toggle('3'); }}
                        >
                            Работники для сбора
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={state.activeTab}>
                    <TabPane tabId="1">
                        <TabForWorkers onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ rZasev: v }) }} values={props.values.rZasev} dols={ props.values.dols} />
                    </TabPane>
                    <TabPane tabId="2">
                        <TabForWorkers onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ rObrabotka: v }) }} values={props.values.rObrabotka} dols={props.values.dols} />
                    </TabPane>
                    <TabPane tabId="3">
                        <TabForWorkers onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ rSbor: v }) }} values={props.values.rSbor} dols={props.values.dols} />
                    </TabPane>
                </TabContent>
            </Container>
        </PopUpWithBlurCanvas>

    );
}; export default WorkerSelect;