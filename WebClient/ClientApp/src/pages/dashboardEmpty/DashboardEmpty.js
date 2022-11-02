import React, { Component } from 'react';
import { useLocation } from 'react-router';
import BackIn_Icon from '../../components/sideBarDashboard/BackInModel_Icon';
import HomePanel_Icon from '../../components/sideBarDashboard/HomePanel_Icon';
import Map_Icon from '../../components/sideBarDashboard/Map_Icon';
import SensorsIoT from '../../components/sideBarDashboard/SensorsIoT';
import SideBarDashboard from '../../components/sideBarDashboard/SideBarDashboard.js';
import '../pages.css';
import ContentDashboard from './components/ContentDashboard';
/*import TransportSelect from './Modal/transportSelect/TransportSelect';*/ //TODO Redo
import { IconButton } from "../../components/sideBarDashboard/util/IconButton";
import { ThemeContextConsumer } from "../../components/ThemeContext";
class Dash extends Component {
    constructor(props) {
        super(props);
        this.state = { isActive: false };
    }
    handleActiveChanged = () => {
        let prev = this.state.isActive;
        this.setState({ isActive: !(prev) });
        console.log(this.state);
    }
    isInherit = this.props.location.state ? (this.props.location.state.isInherit == 1 ? true : false) : true
    icons =
        [
            new IconButton("#/", "Главная панель", <HomePanel_Icon />),
            new IconButton("/map", "Карта", <Map_Icon />),
            new IconButton("#nogo", "Датчики IoT", <SensorsIoT />),
            new IconButton("/models", "Вернуться к выбору модели", <BackIn_Icon />),
        ]
    render(props) {
        return (
            <ThemeContextConsumer>
                {context =>
                (
                    <>
                        <SideBarDashboard icons={this.icons} />
                        {/*<TransportSelect isActive={this.state.isActive} handleActiveChanged={this.handleActiveChanged}/>*/}
                        <ContentDashboard isInherit={this.isInherit} handleActiveChanged={this.handleActiveChanged} />
                    </>
                )
                }
            </ThemeContextConsumer>
        );
    }
}
const DashboardEmpty = (props) => {
    const location = useLocation()
    return (<Dash location={location} {...props} />)
}; export default DashboardEmpty;