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

        console.log(url)
        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const data = response.data.Data

                    var totalInsession = 0
                    var totalCapacity = 0

                    for (var i = 0; i < data.length; i++) {
                        totalCapacity = totalCapacity + data[i].totalInsession
                        totalInsession = totalCapacity + data[i].totalInsession
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

        this.loadData()
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
                    <div className="col-md-8">
                        <StatusChart/>
                    </div>
                    <div className="col-md-4">
                        <div className="clearfix">
                            <div className="c100 p50 big">
                                <span>50%</span>
                                <div className="slice">
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row half-content">
                    <div className="col-md-8">
                        <ExpiredChart/>
                    </div>
                    <div className="col-md-4">
                        <LastestTickets/></div>
                </div>
            </div>
        )
    }
}

const listTicket = [
    {
        numberPlate: "30A-65765",
        duration: "2 Giờ",
        cppCode: "002",
        time: "17:04"
    }, {
        numberPlate: "30A-1545",
        duration: "1 Giờ",
        cppCode: "009",
        time: "17:34"
    }, {
        numberPlate: "30A-3255",
        duration: "3 Giờ",
        cppCode: "008",
        time: "17:04"
    }, {
        numberPlate: "30A-23523",
        duration: "4 Giờ",
        cppCode: "005",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }, {
        numberPlate: "30A-32523",
        duration: "1 Giờ",
        cppCode: "003",
        time: "17:04"
    }
]

const dataComposed = [
    {
        name: 'Page A',
        uv: 590,
        pv: 800,
        amt: 1400
    }, {
        name: 'Page B',
        uv: 868,
        pv: 967,
        amt: 1506
    }, {
        name: 'Page C',
        uv: 1397,
        pv: 1098,
        amt: 989
    }, {
        name: 'Page D',
        uv: 1480,
        pv: 1200,
        amt: 1228
    }, {
        name: 'Page E',
        uv: 1520,
        pv: 1108,
        amt: 1100
    }, {
        name: 'Page F',
        uv: 1400,
        pv: 680,
        amt: 1700
    }
];

const dataBar = [
    {
        name: 'Page A',
        uv: 4000,
        pv: 2400,
        amt: 2400
    }, {
        name: 'Page B',
        uv: 3000,
        pv: 1398,
        amt: 2210
    }, {
        name: 'Page C',
        uv: 2000,
        pv: 9800,
        amt: 2290
    }, {
        name: 'Page D',
        uv: 2780,
        pv: 3908,
        amt: 2000
    }, {
        name: 'Page E',
        uv: 1890,
        pv: 4800,
        amt: 2181
    }, {
        name: 'Page F',
        uv: 2390,
        pv: 3800,
        amt: 2500
    }, {
        name: 'Page G',
        uv: 3490,
        pv: 4300,
        amt: 2100
    }
];

export default LiveComponents