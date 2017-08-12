import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {
    ComposedChart,
    Line,
    BarChart,
    Area,
    AreaChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Loading from '../assets/js/loading'
import axios from 'axios'
import moment from 'moment';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import LastestTickets from './LastestTickets'
import StatusChart from './StatusChart'
import ExpiredChart from './ExpiredChart'

import '../assets/css/circle.css'

const currencyFormat = (uv) => {

    if (Math.floor(uv) === 0) {
        return "0 đ"
    }

    var price = Math.floor(uv)
    var priceString = ''
    var count = 0

    while (price > 0) {
        var number = price % 10;
        price = Math.floor(price / 10);
        count = count + 1

        priceString = number + priceString;

        if (count === 3 && price > 0) {
            priceString = "." + priceString;
            count = 0;
        }

    }

    return priceString + " đ"
}

const timeRender = (time) => {
    return moment
        .unix(time)
        .format("HH:mm");
}
const dateRender = (time) => {
    return moment
        .unix(time)
        .format("DD/MM/YYYY");
}

const ticketDuration = (second) => {

    if (second === 0) {
        return "-"
    }

    var minute = second / 60

    var hour = minute / 60;
    var minute = minute - (hour * 60);

    if (hour === 0) {
        return minute + " phút"
    }

    if (minute === 0) {
        return hour + " giờ"
    }

    return hour + " giờ " + minute + " phút"
}

class LiveComponents extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            errors: {}
        };

        this.loadData = this
            .loadData
            .bind(this)
    }

    loadData() {
        var url = "/p/carpp/all/status"

        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const data = response.data.Data

                    var totalInsession = 0
                    var totalCapacity = 0

                    for (var i = 0; i < data.length; i++) {
                        totalCapacity = totalCapacity + data[i].Capacity
                        totalInsession = totalInsession + data[i].InSessionNumber
                    }

                    this.setState({
                        loading: false,
                        data: {
                            total: totalCapacity,
                            inSession: totalInsession,
                            rate: Math.floor(totalInsession / totalCapacity * 100)
                        }
                    })

                } else {
                    this.setState({loading: false, data: {}})
                }
            })
            .catch((error) => {
                this.setState({loading: false})
            });
    }

    componentDidMount() {

        this.loadData()
        setInterval(() => {
            this.loadData()
        }, 30000);

        const script = document.createElement("script");

        script.src = "/assets/admin/layout/css/custom.js";
        script.async = true;

        document
            .body
            .appendChild(script);

        const style = document.createElement("style");

        style.src = "/assets/admin/layout/css/circle.css";
        style.async = true;

        document
            .body
            .appendChild(style);

    }

    _validate() {
        var errors = {};
        //handle error in here
        return errors;
    }

    render() {
        const {data, loading} = this.state;
        return (
            <div className="container-fluid">

                <div className="row half-content">
                    <div className="col-md-12">
                        <p className="chart-title">Tình trạng chỗ trống
                            <span
                                style={{
                                color: 'gray',
                                fontSize: '18px',
                                float: 'right',
                                margin: '5px 10px'
                            }}>Mật độ: {this.state.data.rate}% &nbsp; &nbsp; {this.state.data.inSession}
                                &nbsp; xe &nbsp; / &nbsp; {this.state.data.total}
                                &nbsp; ô</span>
                        </p>

                        <StatusChart/>
                    </div>
                    {/*<div className="col-md-4">
                        <p
                            style={{
                            marginTop: 20,
                            fontSize: 40,
                            fontWeight: 'bolder'
                        }}>{this.state.data.inSession}/{this.state.data.total}</p>
                        <div className="clearfix">
                            <div
                                className={'c100 big center p' + this.state.data.rate}
                                style={{
                                marginTop: 30
                            }}>
                                <span>{this.state.data.rate}%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                    </div>*/}
                </div>
                <div className="row half-content">
                    <div className="col-md-12">
                        <p className="chart-title">Tình trạng đỗ xe quá giờ
                        </p>
                        <ExpiredChart/>
                    </div>
                    {/*<div className="col-md-4">
                        <LastestTickets/>
                    </div>*/}
                </div>
            </div>
        )
    }
}

export default LiveComponents