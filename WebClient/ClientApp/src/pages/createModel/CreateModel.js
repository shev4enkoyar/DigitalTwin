import React, { Component } from 'react';
import '../pages.css';
import TransportCard from './components/TransportCard';
import IotCard from './components/IotCard';
import ChemistryCard from './components/ChemistryCard';
import FieldCard from './components/FieldCard';
import CultureCard from './components/CultureCard';
import HistoryCard from './components/HistoryCard';
import EconomicCard from './components/EconomicCard';
import ElementStep from './ElementStep';
import TransportSelect from './../dashboardEmpty/transportSelect/TransportSelect';
import { ThemeContextConsumer } from '../../components/ThemeContext';
import CardNameModel from './CardNameModel';
import { Container } from "reactstrap/lib";
class CreateModel extends Component {
    constructor(props) {
        super(props);
        this.state = { children: [{ name: "", pred: "Да", visible: true }, { hist: false, visible: false }, { productId: -1, cult: 0, sort: 0, frac: "", gust: "", norm: "", total: "", visible: false }, { kad: "", visible: false }, { zasev:[], obrabotka:[], sbor:[], visible: false, isActive:false}, { chem: 0, pest: 0, ud: 0, xxx: 0, visible: false }, { dat: false, visible: false }, { vys: "", obr: "", sbor: "", workerN: "", period: "", visible: false }] };
    }
    steps=["Создание технологической карты", "Загрузка исторических данных","Ввод данных о культуре", "Ввод данных о поле", "Добавление техники","Данные о химических средствах","Установка датчиков IoT","Ввод экономических показателей"]
    handleVisibleSwitch = (i) => {
        const temp = this.state.children.map((value, index, array) => { return { ...value, visible: index === i } })
        this.setState({
            children: temp
        }
        )
        console.log(temp)
    }
    handleActiveChanged = () => {
        let prev = this.state.children[4].isActive;
        this.setStatus({ isActive: !(prev) }, 4);
        console.log(this.state);
    }
    handleIsProgress = () => {
        let index = 0;
        this.state.children.map((value, i) => {
            if (value.visible) {
                index = i
            }
            return value
        })
        return index
    }
    setStatus = (v, i) => {
        const subset = this.state.children.map((value, index, array) => { return index == i ? { ...value, ...v } : { ...value } })
        this.setState({
            children: subset
        })
        console.log(subset)
    }
    render() {

        return (
            <ThemeContextConsumer>
                {
                    context => (
                        <div className={ context.theme + "Gray"+" d-flex justify-content-center w-100 h-100 position-absolute mt-2 "}>
                            <TransportSelect setStatus={(v) => { this.setStatus(v, 4) }} values={this.state.children[4]} handleActiveChanged={this.handleActiveChanged} />
                            <Container className={context.theme +"Step d-flex p-0 m-0"} style={{ backgroundColor: '#302F38', borderRadius: '3px', border: '1px solid #000', maxHeight: '65px', }}>{
                                this.steps.map((value, index) =>
                                    <ElementStep active={this.state.children[index].visible} key={index} progress={this.handleIsProgress() >= index} numberStep={index + 1} nameCard={value} />
                                )}
                            </Container>
                            <CardNameModel setStatus={(v) => { this.setStatus(v, 0) }} values={this.state.children[0]} visible={this.state.children[0].visible} onClick={() => { this.handleVisibleSwitch(this.state.children[0].pred == "Да" ? 1 : 2) }} />
                            <HistoryCard setStatus={(v) => { this.setStatus(v, 1) }} values={this.state.children[1]} visible={this.state.children[1].visible} onClick={() => { this.handleVisibleSwitch(2) }}></HistoryCard>
                            <CultureCard setStatus={(v) => { this.setStatus(v, 2) }} values={this.state.children[2]} visible={this.state.children[2].visible} Back={() => { this.handleVisibleSwitch(this.state.children[0].pred == "Да" ? 1 : 0) }} onClick={() => { this.handleVisibleSwitch(3) }} />
                            <FieldCard setStatus={(v) => { this.setStatus(v, 3) }} values={this.state.children[3]} visible={this.state.children[3].visible} onClick={() => { this.handleVisibleSwitch(4) }} />
                            <TransportCard setStatus={(v) => { this.setStatus(v, 4) }} values={this.state.children[4]} visible={this.state.children[4].visible} onClick={() => { this.handleVisibleSwitch(5) }} />
                            <ChemistryCard setStatus={(v) => { this.setStatus(v, 5) }} values={this.state.children[5]} visible={this.state.children[5].visible} onClick={() => { this.handleVisibleSwitch(6) }} />
                            <IotCard setStatus={(v) => { this.setStatus(v, 6) }} values={this.state.children[6]} visible={this.state.children[6].visible} onClick={() => { this.handleVisibleSwitch(7) }} />
                            <EconomicCard setStatus={(v) => { this.setStatus(v, 7) }} values={this.state.children[7]} visible={this.state.children[7].visible} data={this.state.children} onClick={() => {}} />
                        </div>
                        )
                }
            </ThemeContextConsumer>
        );
    }


} export default CreateModel;