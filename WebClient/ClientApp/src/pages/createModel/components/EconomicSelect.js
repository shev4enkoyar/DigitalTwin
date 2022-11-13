import React, { useState } from 'react';
import PopUpWithBlurCanvas from "../../../components/popUp/PopUpWithBlurCanvas";
import TabForEconomic from './TabForEconomic';
import './../../pages.css';
import { TabContent, TabPane, Nav, NavItem, NavLink, Container, Button } from "reactstrap";
const EconomicSelect = (props) => {
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
                <Nav tabs className="justify-content-center">
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '1'? "active" : ""}
                            onClick={() => { toggle('1'); }}
                        >
                            Работы по засеву
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '2' ? "active" : ""}
                            onClick={() => { toggle('2'); }}
                        >
                            Работы по обработке
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '3' ? "active" : ""}
                            onClick={() => { toggle('3'); }}
                        >
                            Работы по сбору
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={state.activeTab}>
                    <TabPane tabId="1">
                        <TabForEconomic onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ eZasev: v }) }} values={props.values.eZasev} />
                    </TabPane>
                    <TabPane tabId="2">
                        <TabForEconomic onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ eObrabotka: v }) }} values={props.values.eObrabotka} />
                    </TabPane>
                    <TabPane tabId="3">
                        <TabForEconomic onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ eSbor: v }) }} values={props.values.eSbor} />
                    </TabPane>
                </TabContent>
            </Container>
        </PopUpWithBlurCanvas>

    );
}; export default EconomicSelect;