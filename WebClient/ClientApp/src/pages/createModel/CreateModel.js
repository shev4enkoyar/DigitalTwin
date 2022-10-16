import React, { Component } from 'react';
import '../pages.css';
import TransportCard from '../../components/cardsForDashboard/TransportCard';
import IotCard from '../../components/cardsForDashboard/IotCard';
import ChemistryCard from '../../components/cardsForDashboard/ChemistryCard';
import FieldCard from '../../components/cardsForDashboard/FieldCard';
import CultureCard from '../../components/cardsForDashboard/CultureCard';
import HistoryCard from '../../components/cardsForDashboard/HistoryCard';
import EconomicCard from '../../components/cardsForDashboard/EconomicCard';
import ElementStep from './ElementStep';
import { Button, Container } from 'react-bootstrap';
import CardNameModel from './CardNameModel';
class CreateModel extends Component {
    constructor(props) {
        super(props);
        this.state = { children: [{ name: "", pred: "Да", visible: true }, { hist: false, visible: false }, { productId: -1, cult: 0, sort: 0, frac: "", gust: "", norm: "", total: "", visible: false }, { kad: "", visible: false }, { added: true, visible: false }, { chem: true, visible: false}, { dat: false, visible: false }, { econom: true, visible: false }] };
    }



    handleVisibleSwitch = (i) => {
        const temp = this.state.children.map((value, index, array) => { return { ...value, visible: index === i } })
        this.setState({
            children: temp
        }
        )
        console.log(temp)
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
                <div className="d-flex justify-content-center w-100 h-100">
                    <CardNameModel setStatus={(v) => { this.setStatus(v, 0) }} values={this.state.children[0]} visible={this.state.children[0].visible} onClick={() => { this.handleVisibleSwitch(this.state.children[0].pred == "Да" ? 1 : 2) }} />
                    <HistoryCard setStatus={(v) => { this.setStatus(v, 1) }} values={this.state.children[1]} visible={this.state.children[1].visible} onClick={() => { this.handleVisibleSwitch(2) }}></HistoryCard>
                    <CultureCard setStatus={(v) => { this.setStatus(v, 2) }} values={this.state.children[2]} visible={this.state.children[2].visible} onClick={() => { this.handleVisibleSwitch(3) }} />
                    <FieldCard setStatus={(v) => { this.setStatus(v, 3) }} values={this.state.children[3]} visible={this.state.children[3].visible} onClick={() => { this.handleVisibleSwitch(4) }} />
                    <TransportCard handleActiveChanged={() => { }} setStatus={(v) => { this.setStatus(v, 4) }} values={this.state.children[4]} visible={this.state.children[4].visible} onClick={() => { this.handleVisibleSwitch(5) }} />
                    <ChemistryCard setStatus={(v) => { this.setStatus(v, 5) }} values={this.state.children[5]} visible={this.state.children[5].visible} onClick={() => { this.handleVisibleSwitch(6) }} />
                    <IotCard setStatus={(v) => { this.setStatus(v, 6) }} values={this.state.children[6]} visible={this.state.children[6].visible} onClick={() => { this.handleVisibleSwitch(7) }} />
                    <EconomicCard setStatus={(v) => { this.setStatus(v, 7) }} values={this.state.children[7]} visible={this.state.children[7].visible} />
                </div>
        );
    }


} export default CreateModel;