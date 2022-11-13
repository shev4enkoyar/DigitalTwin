import React, { Component } from "react";
import authService from "../../../components/api-authorization/AuthorizeService";
import Combobox from "../../../components/combobox/ComboBox";
import Input from '../../../components/input/Input';
import BaseCard from "./BaseCard";
import './CardsForDashboard.css';
import {Col, Container,Row } from "reactstrap";
import {LoadingFragment} from "../../../util/LoadingFragment";
class CultureCard extends Component{
     cult = ["Введите наименование культуры...", "Рис", "Овес"]
     sortForCult = ["Введите сорт культуры...", "cc"]
     isFull = () => {
        if (this.props.values === null || this.props.values === undefined) {
        }
        return !Object.keys(this.props.values).map(val => this.props.values[val]).some(function (value, index, array) { return (value === false || value === 0 || value === "" || value === undefined) })
    }
    errorForInp = (value) => {
        const prev = this.state;
        this.setState({ ...prev, errors: { ...(prev.errors), ...value } })
        console.log(this.state)
    }
    constructor(props) {
        super(props);
        this.state = {
            cultureNames: [], cultureSort: [], productData: [], loading: true, errors: {
                fracEr: "", normEr: "", gustEr: "", totalEr: "" } };
    }
    componentDidMount() {
        this.GetProducts();
    }
    render() {
        return (
            this.state.loading
                ?
                    <LoadingFragment/>
                :
                <BaseCard className="widForCult" visible={this.props.visible} hText="Статус тех.карты" descr="Требуется добавить данные о культуре!" notifyColor="#DC3545" off={this.props.off}>
                        <Container className="p-0 d-flex flex-wrap" style={{ display: 'flex', flexWrap: 'wrap' }}>
                            <Col className="px-1">
                                <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Культура" classNameCont="padCombobox " options={this.state.cultureNames} onChange={
                                    (empty) => {
                                        this.props.setStatus({
                                            cult: empty
                                            /*productId: this.state.productData.find(el => el.name === empty).id*/
                                        })
                                        let sort = [];
                                        sort.push("Введите сорт культуры...");
                                        this.state.productData.forEach(el => {
                                            if (el.name.split(';')[0] === empty)
                                                sort.push(el.name.split(';')[1]);
                                        });
                                        this.setState({ cultureSort: sort });
                                    }}
                            />
                            <p className="m-0 text-danger p-0" style={{ fontSize: '14px', fontFamily: 'Open Sans' }}>
                                {this.state.errors.fracEr}
                            </p>
                            <Input Label="Фракция" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" value={this.props.values.frac} onInput={(event) => { let reg = /^[0-9A-Za-zА-Яа-я]*$/i.test(event.target.value); if (reg) { this.props.setStatus({ frac: event.target.value.trim() }); this.errorForInp({ fracEr: "" }); }  else this.errorForInp({fracEr: "Вводите только числа и буквы" }) }} />
                            <p className="m-0 text-danger p-0" style={{ fontSize: '14px', fontFamily: 'Open Sans' }}>
                                {this.state.errors.normEr}
                            </p>
                            <Input Label="Норма высева" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) { this.props.setStatus({ norm: event.target.value.trim() }); this.errorForInp({ normEr: "" }); } else this.errorForInp({ normEr: "Вводите только целые или дробные числа" }) }} value={this.props.values.norm} />
                            </Col>
                            <Col className="px-1">
                                <Combobox className="FormControlSelect" classTextCombobox="textForSign12" textCombobox="Сорт" classNameCont="padCombobox " options={this.state.cultureSort} onChange={
                                    (empty) => {
                                        this.props.setStatus({
                                            sort: empty,
                                            productId: this.state.productData.find(el => el.name === this.props.values.cult + ' ' + empty).id
                                        })
                                    }}
                            />
                            <p className="m-0 text-danger p-0" style={{ fontSize: '14px', fontFamily: 'Open Sans' }}>
                                {this.state.errors.gustEr}
                            </p>
                            <Input Label="Густота" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) { this.props.setStatus({ gust: event.target.value.trim() }); this.errorForInp({ gustEr: "" }); } else this.errorForInp({ gustEr: "Вводите только целые или дробные числа" }) }} value={this.props.values.gust} />
                            <p className="m-0 text-danger p-0" style={{ fontSize: '14px', fontFamily: 'Open Sans' }}>
                                {this.state.errors.totalEr}
                            </p>
                            <Input Label="Вес этапов" classNameP="textForSign12" className="inpCreateForDashCard" contClass="contForInpDashE" onInput={(event) => { var reg = /^(0|([1-9][0-9]{0,5}))?(\.|(\.[0-9]{1,5}))?$/i.test(event.target.value); if (reg) { this.props.setStatus({ total: event.target.value.trim() }); this.errorForInp({ totalEr: "" }); } else this.errorForInp({ totalEr: "Вводите только целые или дробные числа" }) }} value={this.props.values.total} />
                            </Col>
                    </Container>
                    <Row className="py-3 px-0">
                        <Col className="d-flex justify-content-center">
                            <button onClick={() => { this.props.Back() }} className="btn btn-primary mx-5" style={{ width: "max-content" }} >
                                Назад
                            </button>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <button onClick={() => { if (this.isFull() == true) this.props.onClick(); }} className="btn btn-primary mx-5" style={{ width: "max-content" }} >
                                Далее
                            </button>
                        </Col>
                    </Row>
                    </BaseCard>
        )
    }

    async GetProducts() {
        const token = await authService.getAccessToken();
        const response = await fetch('api/products', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        let cultureNameTemp = new Set();
        cultureNameTemp.add("Введите наименование культуры...");
        data.sort((a, b) => {
            if (a.id < b.id) {
                return -1;
            }
            if (a.id > b.id) {
                return 1;
            }
            return 0;
        });
        data.forEach(el => cultureNameTemp.add(el.name.split(' ')[0]));
        this.setState({ productData: data, cultureNames: Array.from(cultureNameTemp), loading: false});
    }


}
export default CultureCard;

