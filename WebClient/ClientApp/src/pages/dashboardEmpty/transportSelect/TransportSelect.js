import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Container, Button } from 'react-bootstrap';
import PopUpWithBlurCanvas from "../../../components/popUp/PopUpWithBlurCanvas";
import TabForTransportSelect from './TabForTransportSelect';
import './../../pages.css';
const TransportSelect = (props) => {
    return (
        <PopUpWithBlurCanvas isBlur={true} isActive={props.values.isActive} handleActiveChange={() => { props.setStatus({isActive:false})} } className="TranspCard" styleFlex={{ top: '0px!important', marginTop:'0px', margin:'auto' } } >
            <Container style={{ padding: '0px' }}>
                <Button onClick={() => { props.setStatus({ isActive: false }) }} className="btn btn-danger position-absolute" style={{right: '3px',top: '2px' }}>
                    x
                </Button>
                <Tabs
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
                </Tabs>
            </Container>
        </PopUpWithBlurCanvas>

    );
}; export default TransportSelect;