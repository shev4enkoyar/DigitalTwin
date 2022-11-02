import React, { useState } from 'react';
import { Button, Container, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap/lib";
import PopUpWithBlurCanvas from "../../../components/popUp/PopUpWithBlurCanvas";
import './../../pages.css';
import TabForTransportSelect from './TabForTransportSelect';
const TransportSelect = (props) => {
    const [state, setState] = useState({ activeTab: '1' });
    const toggle=(tab) =>{
        if (state.activeTab !== tab) {
            setState({
            activeTab: tab
            });
        }
    }
    return (
        <PopUpWithBlurCanvas isBlur={true} isActive={props.values.isActive} handleActiveChange={() => { props.setStatus({isActive:false})} } className="TranspCard" styleFlex={{ top: '0px!important', marginTop:'0px', margin:'auto' } } >
            <Container style={{ padding: '0px' }}>
                <Button onClick={() => { props.setStatus({ isActive: false }) }} className="btn btn-danger position-absolute" style={{right: '3px',top: '2px' }}>
                    x
                </Button>
                <Nav tabs className="justify-content-center">
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '1'? "active":"" }
                            onClick={() => { toggle('1'); }}
                        >
                            Транспорт для засева
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '2'? "active" : ""}
                            onClick={() => { toggle('2'); }}
                        >
                            Транспорт для обработки
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={state.activeTab === '3' ? "active" : ""}
                            onClick={() => { toggle('3'); }}
                        >
                            Транспорт для сбора
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={state.activeTab}>
                    <TabPane tabId="1">
                        <TabForTransportSelect onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ zasev: v }) }} values={props.values.zasev} />
                    </TabPane>
                    <TabPane tabId="2">
                        <TabForTransportSelect onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ obrabotka: v }) }} values={props.values.obrabotka} />
                    </TabPane>
                    <TabPane tabId="3">
                        <TabForTransportSelect onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ sbor: v }) }} values={props.values.sbor} />
                    </TabPane>
                </TabContent>
                {/*<Tabs
                    defaultActiveKey="first"
                    id="justify-tab-example"
                    className="mb-3 bg-transparent d-flex justify-content-center border-0">
                    <Tab tabClassName="bg-primary text-white" eventKey="first" title="Транспорт для засева">
                        <TabForTransportSelect onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ zasev: v }) }} values={props.values.zasev} />
                    </Tab>
                    <Tab tabClassName="bg-primary text-white" eventKey="second" title="Транспорт для обработки">
                        <TabForTransportSelect onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ obrabotka: v }) }} values={props.values.obrabotka} />
                    </Tab>
                    <Tab tabClassName="bg-primary text-white" eventKey="third" title="Транспорт для сбора">
                        <TabForTransportSelect onClick={() => { props.setStatus({ isActive: false }) }} setStatus={(v) => { props.setStatus({ sbor: v }) }} values={props.values.sbor} />
                    </Tab>
                </Tabs>*/}
            </Container>
        </PopUpWithBlurCanvas>

    );
}; export default TransportSelect;