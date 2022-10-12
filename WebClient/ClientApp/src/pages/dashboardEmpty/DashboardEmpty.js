import React, { Component } from 'react';
import '../pages.css';
import SideBarDashboard from '../../components/sideBarDashboard/SideBarDashboard.js';
import HomePanel_Icon from '../../components/sideBarDashboard/HomePanel_Icon';
import Map_Icon from '../../components/sideBarDashboard/Map_Icon';
import SensorsIoT from '../../components/sideBarDashboard/SensorsIoT';
import BackIn_Icon from '../../components/sideBarDashboard/BackInModel_Icon';
import ContentDashboard from './components/ContentDashboard';
import { useLocation } from 'react-router';
/*import TransportSelect from './Modal/transportSelect/TransportSelect';*/ //TODO Redo
import {ThemeContextConsumer} from "../../components/ThemeContext";
import {IconButton} from "../../components/sideBarDashboard/util/IconButton";
class Dash extends Component{
    constructor(props){
        super(props);
        this.state = { isActive: false };
    }
    handleActiveChanged = () => {
        let prev = this.state.isActive;
        this.setState({ isActive: !(prev) });
        console.log(this.state);
    }
    isInherit = this.props.location.state ? (this.props.location.state.isInherit == 1? true:false) :true
    icons =
        [
            new IconButton("#/", "Главная панель", <HomePanel_Icon />),
            new IconButton("/map", "Карта", <Map_Icon />),
            new IconButton("#nogo", "Датчики IoT", <SensorsIoT />),
            new IconButton("/models", "Вернуться к выбору модели", <BackIn_Icon />),
        ]
    render(props)
    { 
        return(
                <ThemeContextConsumer>
                    {context =>
                        (
                            <>
                                {/*<TransportSelect isActive={this.state.isActive} handleActiveChanged={this.handleActiveChanged}/>*/}
                                <ContentDashboard isInherit={this.isInherit} handleActiveChanged={this.handleActiveChanged}/>
                                <SideBarDashboard icons={this.icons} />
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