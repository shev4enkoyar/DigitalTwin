import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import './TransportSelect.css';
import { Container } from 'react-bootstrap';
import PopUpWithBlurCanvas from "../../../components/popUp/PopUpWithBlurCanvas";
import TabForTransportSelect from './TabForTransportSelect';
const TransportSelect = (props) => {
    return (
        <PopUpWithBlurCanvas isBlur={true} isActive={props.isActive} handleActiveChange={props.handleActiveChange} className="TranspCard" styleFlex={{ top: '0px!important', marginTop:'0px' } }>
            <Container style={{ padding: '0px'} }>
            <Tabs
                defaultActiveKey="first"
                id="justify-tab-example"
                className="mb-3"
                justify>
                <Tab eventKey="first" title="Транспорт для засева" >
                    <TabForTransportSelect onClick={props.handleActiveChanged} />
                </Tab>
                <Tab eventKey="second" title="Транспорт для обработки" >
                    <TabForTransportSelect onClick={props.handleActiveChanged} />
                </Tab>
                <Tab eventKey="third" title="Транспорт для сбора" >
                    <TabForTransportSelect onClick={props.handleActiveChanged} />
                </Tab>
                </Tabs>
            </Container>
        </PopUpWithBlurCanvas>

    );
}; export default TransportSelect;