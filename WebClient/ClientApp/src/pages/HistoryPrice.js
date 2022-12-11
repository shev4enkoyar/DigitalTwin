import React, { Component } from 'react';
import { Container } from "reactstrap";
import { IconButton } from "../components/sideBarDashboard/util/IconButton";
import CardForBody from './../components/cardForBody/CardForBody';
import SideBarDashboard from './../components/sideBarDashboard/SideBarDashboard';
import { ThemeContextConsumer } from './../components/ThemeContext';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import authService from "../../src/components/api-authorization/AuthorizeService";
import './pages.css';
import { ClientRoutes } from "../util/ClientRoutes";
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

class HistoryPrice extends Component {
    iconsLeftBar = [
        new IconButton("/" + ClientRoutes.DASHBOARD + "/" + this.props.match.params.modelId, "Главная панель",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/home.png" />),
        new IconButton("/" + ClientRoutes.MAP + "/" + this.props.match.params.modelId, "Карта",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/small/344/map.png" />),
        new IconButton("/" + ClientRoutes.DOCS + "/" + this.props.match.params.modelId, "Документы",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/document--v1.png" />),
        new IconButton("/" + ClientRoutes.IOTPAGE + "/" + this.props.match.params.modelId, "Датчики IoT",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/windows/344/sensor.png" />),
        new IconButton("/" + ClientRoutes.RECOMMENDATIONS + "/" + this.props.match.params.modelId, "Рекомендации",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios-glyphs/344/task.png" />),
        new IconButton("/" + ClientRoutes.HISTORY_PRICE + "/" + this.props.match.params.modelId, "История цен",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/material-outlined/344/ruble.png" />),
        new IconButton("/" + ClientRoutes.GANT + "/" + this.props.match.params.modelId, "График работ",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/rebalance-portfolio.png" />),
        new IconButton("/" + ClientRoutes.MODELS, "Вернуться к выбору модели",
            <img style={{ width: "25px", height: "25px", margin: "7px 0px 0px" }} className="icon" src="https://img.icons8.com/ios/344/logout-rounded--v1.png" />)
    ];
    constructor(props) {
        super(props);
        this.state = {
            pie: {
                labels: [],
                datasets: [
                    {
                        label: "Users Gained ",
                        data: [],
                        pointBackgroundColor: '#047BF8',
                        borderColor: '#047BF8',
                        pointRadius: '1',

                    }
                ]
            }
        }
    }
    componentDidMount() {
        this.GetPrice();
    }
    async GetPrice() {
        const token = await authService.getAccessToken();
        const response = await fetch(`api/products/get_product_histories/${this.props.match.params.modelId}`, {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const d = await response.json();

        console.log(d);
        let prices = [];
        let dates = [];
        //if (d.length > 1) {
        //    status.data1 = d[d.length - 2].price
        //    status.data2 = d[d.length - 1].price
        //    console.log(status.data1)
        //    console.log(status.data2)
        //    console.log(d[1].date)
        //}
        //status.label = d.date
        //console.log(status.label)
        //this.setState({ price: status, labels:status[2] });
        d.forEach((el, index) => {
            console.log("111")
            const temp = el.date.split(" ")
            dates.push(new Date(temp[0]).toLocaleDateString())
            prices.push(el.price)
            console.log(112)
        });
        const prev = this.state.pie.datasets[0]
        const newState = { pie: { labels: dates, datasets: [{ ...prev, data: prices }] } }
        console.log(prev)
        console.log(newState)
        this.setState(newState);
    }

    render() {
        return (
            <ThemeContextConsumer>{context => (
                <div style={{ overflow: "auto" }}>
                    <SideBarDashboard icons={this.iconsLeftBar} />
                    <CardForBody styleForCard={{ position: 'relative', padding: '3%', margin: '5% 10% 0% 15%' }} styleTextForCard={{ padding: '0px' }}>
                        <Container className="ContForHistoryTariff p-0 contForReactTable">
                            <div className="chart-container">
                                <h2 style={{ textAlign: "center" }}>История цен</h2>
                                <Line
                                    
                                    data={this.state.pie}

                                    options={{
                                        plugins: {
                                            title: {
                                                display: true
                                            }
                                        },
                                        scales: {
                                            y: {
                                                grid: {
                                                    color: '#4A4A4A'
                                                },
                                                ticks: {
                                                    color: 'white',
                                                    font: {
                                                        size: 14,
                                                    }
                                                }
                                            },
                                            x: {
                                                grid: {
                                                    color: '#4A4A4A'
                                                },
                                                ticks: {
                                                    color: 'white',
                                                    font: {
                                                        size: 14,
                                                    }
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                          </Container>
                    </CardForBody>
                </div>
            )}
            </ThemeContextConsumer>
        );
    }
} export default HistoryPrice;