import React, { useState } from 'react';
import { Button, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap/lib";
import PopUpWithBlurCanvas from "../../../components/popUp/PopUpWithBlurCanvas";
import './../../pages.css';
import TabForWorkers from './TabForWorkers';
const WorkerSelect = (props) => {
    const [state, setState] = useState({ activeTab: '1' });
    const toggle = (tab) => {
        if (state.activeTab !== tab) {
            setState({
                activeTab: tab
            });
        }
    }
    return (
        <PopUpWithBlurCanvas isBlur={true} isActive={props.values.isActive} handleActiveChange={() => { props.setStatus({ isActive: false }) }} className="TranspCard" styleFlex={{ top: '0px!important', marginTop: '0px', margin: 'auto' }} >
            <Container style={{ padding: '0px' }}>
                <Button onClick={() => { props.setStatus({ isActive: false }) }} className="btn btn-danger position-absolute" style={{ right: '3px', top: '2px' }}>
                    x
                </Button>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '1' ? "active" : ""}
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
                        <TabForWorkers onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ rZasev: v }) }} values={props.values.rZasev} />
                    </TabPane>
                    <TabPane tabId="2">
                        <TabForWorkers onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ rObrabotka: v }) }} values={props.values.rObrabotka} />
                    </TabPane>
                    <TabPane tabId="3">
                        <TabForWorkers onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ rSbor: v }) }} values={props.values.rSbor} />
                    </TabPane>
                </TabContent>
            </Container>
        </PopUpWithBlurCanvas>

    );
}; export default WorkerSelect;