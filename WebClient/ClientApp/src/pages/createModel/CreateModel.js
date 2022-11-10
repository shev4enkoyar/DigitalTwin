import React, { Component } from 'react';
import { Container } from "reactstrap/lib";
import { ThemeContextConsumer } from '../../components/ThemeContext';
import '../pages.css';
import TransportSelect from './../dashboardEmpty/transportSelect/TransportSelect';
import CardNameModel from './CardNameModel';
import CultureCard from './components/CultureCard';
import EconomicCard from './components/EconomicCard';
import FieldCard from './components/FieldCard';
import HistoryCard from './components/HistoryCard';
import TransportCard from './components/TransportCard';
import WorkerCard from './components/WorkerCard';
import WorkerSelect from './components/WorkerSelect';
import ElementStep from './ElementStep';
class CreateModel extends Component {
    constructor(props) {
        super(props);
        this.state = { children: [{ name: "", pred: "Да", visible: true }, { hist: false, visible: false }, { productId: -1, cult: 0, sort: 0, frac: "", gust: "", norm: "", total: "", visible: false }, { kad: "", visible: false }, { zasev: [], obrabotka: [], sbor: [], visible: false, isActive: false }, { rZasev: [], rObrabotka: [], rSbor: [], visible: false, isActive: false }, { vys: "", obr: "", sbor: "", workerN: "", period: "", visible: false }] };
    }
    steps=["Создание технологической карты", "Загрузка исторических данных","Ввод данных о культуре", "Ввод данных о поле", "Добавление техники","Данные о работниках", "Ввод экономических показателей"]
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
                            <WorkerSelect setStatus={(v) => { this.setStatus(v, 5) }} values={this.state.children[5]} handleActiveChanged={this.handleActiveChanged} />
                            <Container className={context.theme +"Step d-flex p-0 m-0 position-absolute"} style={{ backgroundColor: '#302F38', borderRadius: '3px', border: '1px solid #000', maxHeight: '65px', }}>{
                                this.steps.map((value, index) =>
                                    <ElementStep active={this.state.children[index].visible} key={index} progress={this.handleIsProgress() >= index} numberStep={index + 1} nameCard={value} />
                                )}
                            </Container>
                            <CardNameModel setStatus={(v) => { this.setStatus(v, 0) }} values={this.state.children[0]} visible={this.state.children[0].visible} onClick={() => { this.handleVisibleSwitch(this.state.children[0].pred == "Да" ? 1 : 2) }} />
                            <HistoryCard setStatus={(v) => { this.setStatus(v, 1) }} values={this.state.children[1]} visible={this.state.children[1].visible} onClick={() => { this.handleVisibleSwitch(2) }}></HistoryCard>
                            <CultureCard setStatus={(v) => { this.setStatus(v, 2) }} values={this.state.children[2]} visible={this.state.children[2].visible} Back={() => { this.handleVisibleSwitch(this.state.children[0].pred == "Да" ? 1 : 0) }} onClick={() => { this.handleVisibleSwitch(3) }} />
                            <FieldCard setStatus={(v) => { this.setStatus(v, 3) }} values={this.state.children[3]} visible={this.state.children[3].visible} Back={() => { this.handleVisibleSwitch(2) }} onClick={() => { this.handleVisibleSwitch(4) }} />
                            <TransportCard setStatus={(v) => { this.setStatus(v, 4) }} values={this.state.children[4]} visible={this.state.children[4].visible} Back={() => { this.handleVisibleSwitch(3) }} onClick={() => { this.handleVisibleSwitch(5) }} />
                            <WorkerCard setStatus={(v) => { this.setStatus(v, 5) }} values={this.state.children[5]} visible={this.state.children[5].visible} Back={() => { this.handleVisibleSwitch(4) }} onClick={() => { this.handleVisibleSwitch(6) }} />
                            <EconomicCard setStatus={(v) => { this.setStatus(v, 6) }} values={this.state.children[6]} visible={this.state.children[6].visible} data={this.state.children} Back={() => { this.handleVisibleSwitch(5) }}  onClick={() => {}} />
                        </div>
                        )
                }
            </ThemeContextConsumer>
        );
    }


} export default CreateModel;