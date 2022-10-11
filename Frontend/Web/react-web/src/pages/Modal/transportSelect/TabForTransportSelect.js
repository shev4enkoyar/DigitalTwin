import { Row, Col, Container} from 'react-bootstrap';
import './TransportSelect.css';
import Combobox from './../../../components/combobox/ComboBox';
import Input from './../../../components/input/Input';
import ButtonEdit from '../../../components/button/ButtonEdit';
import TableForTariffs from '../../../components/tableForTariffs/TableForTariffs';
import { useState } from 'react';
const TabForTransportSelect = (props) => {
    const transport = ["Выберите транспорт...", "Трактор",]
    const markaTrans = ["Выберите марку транспорта...", "1213",]
    const markaSHin = ["Выберите марку шин...", "1213",]
    const [useAddTransp, setUseAddTransp] = useState
    (
        { transp: 0, markTransp: 0, countTransp: 0, markShin: 0, countShin: 0 }
    )
    const [isAddTransp, setAddTransp] = useState([])
    const handleSelectTransp = (value) =>
    {
        setUseAddTransp({ ...useAddTransp, ...value })
    }
    const handleAddingTransp = () =>
    {
        setAddTransp([...isAddTransp, { num: (isAddTransp ? isAddTransp.length : 0) + 1, ...useAddTransp }])
        isAddTransp.map((value, index) => console.log({ num: index, ...value }))
    }
    const zagForTransp =['#', 'Наименование транспорта', 'Марка транспорта', 'Количество транспорта', 'Марка шин', 'Количество шин'];
    return (
        <Container className="tabForTransp">
            <Row id="rowForTab">
                <Combobox setInherit={(value) => { handleSelectTransp({ transp: value }) }} className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Транспорт" classNameCont="forTransp " options={transport} />
                <Combobox setInherit={(value) => { handleSelectTransp({ markTransp: value }) }} className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Марка транспорта" classNameCont="forTransp " options={markaTrans} />
                <Input onChange={(value) => { handleSelectTransp({ countTransp: value.target.value }) }} Label="Количество транспорта" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard " contClass="inpContForTransp" placeholder="0" />
                <Combobox setInherit={(value) => { handleSelectTransp({ markShin: value }) }} className="FormControlSelect"  classTextCombobox="textForSign12" textCombobox="Марка шин" classNameCont="forTransp " options={markaSHin} />
                <Input onChange={(value) => { handleSelectTransp({ countShin: value.target.value }) }} Label="Количество шин" classNameP="textForSign12 forNowrap" className="inpCreateForDashCard " contClass="inpContForTransp" placeholder="0" />
            </Row>
            <Col style={{ marginBottom: '40px', display: 'flex', flexDirection:'column' }}>
                <ButtonEdit onClick={handleAddingTransp} className="blueBut dashBut simpleBut" textForButton="Добавить" classTextName="textOpenSans14" buttonStyle={{margin:'10px 0px'} } />
                <ButtonEdit onClick={() => { props.onClick(false) }} className="blueBut dashBut simpleBut" textForButton="Закрыть окно" classTextName="textOpenSans14" buttonStyle={{ margin: '5px 0px' }} />  
            </Col>
            <TableForTariffs classNameTab="margTable" textForTable="Добавленный транспорт" classNamesTD="ForBox" headersForTable={zagForTransp} contentsForTable={(isAddTransp[0] === undefined) ? [{ num: "", transp: "", markaTrans: "", countTransp: "", markaSHin: "", countShin: "" }] : isAddTransp} />
        </Container>

    );
}; export default TabForTransportSelect;