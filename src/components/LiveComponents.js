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
            listCompany: [],
            fromTime: moment().subtract(1, 'months'),
            toTime: moment(),
            showChart: false,
            loading: false,
            errors: {}
        };
        this.onSubmitForm = this
            .onSubmitForm
            .bind(this)

        this.loadData = this
            .loadData
            .bind(this)

        this.changeCurrentPage = this
            .changeCurrentPage
            .bind(this)

        this.queryString = this
            .queryString
            .bind(this)

        this.handleChangeFromTime = this
            .handleChangeFromTime
            .bind(this);
        this.handleChangeToTime = this
            .handleChangeToTime
            .bind(this);
    }

    loadData(currentPage) {
        var url = "p/provider/list"

        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const provderList = response.data.Data
                    this.setState({listCompany: provderList})
                } else {
                    this.setState({listCompany: []})
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

        this.loadData(0)
    }

    changeCurrentPage(currentPage) {
        this.loadData(currentPage)
    }

    handleChangeFromTime(date) {
        this.setState({fromTime: date});
    }

    handleChangeToTime(date) {
        this.setState({toTime: date});
    }

    queryString(currentPage) {
        return "";
    }

    _validate() {
        var errors = {};
        //handle error in here
        return errors;
    }

    onSubmitForm(e) {
        e.preventDefault()

        this.setState({loading: true})

        const fromTime = moment({
            year: this
                .state
                .fromTime
                .year(),
            month: this
                .state
                .fromTime
                .month(),
            day: this
                .state
                .fromTime
                .date()
        }).unix()

        const toTime = moment({
            year: this
                .state
                .toTime
                .year(),
            month: this
                .state
                .toTime
                .month(),
            day: this
                .state
                .toTime
                .date()
        }).unix() + 86340;

        var url = "/p/report_monthly_revenue?cpp_code=" + this.refs.cpp_code.value + "&from_time=" + fromTime + "&to_time=" + toTime
        console.log(url)
        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const data = response.data.Data

                    var n = data.length;
                    var weekArr = []

                    for (var i = 0; i < data.length; i++) {
                        data[i].Card = data[i].ATM + data[i].VisaMaster
                        data[i].Other = data[i].Promotion + data[i].InternetBanking
                    }

                    for (var n = data.length; n > 6; n = n - 7) {
                        var weekRevenue = 0
                        var weekCard = 0
                        var weekOther = 0
                        var weekSMS = 0

                        for (var i = n - 7; i < n; i++) {
                            weekRevenue = weekRevenue + data[i].Revenue
                            weekCard = weekCard + data[i].Card
                            weekOther = weekOther + data[i].Other
                            weekSMS = weekSMS + data[i].SMS
                        }

                        weekArr.splice(0, 0, {
                            Revenue: weekRevenue,
                            Week: moment
                                .unix(data[n - 7].Day)
                                .format("DD/MM") + "-" + moment
                                .unix(data[n - 1].Day)
                                .format("DD/MM"),
                            CardRevenue: weekCard,
                            OtherRevenue: weekOther,
                            SMSRevenue: weekSMS
                        })
                    }

                    for (var m = weekArr.length; m > 0; m--) {
                        var weekRevenue = 0
                        var element = 0

                        for (var i = m; i > m - 4; i--) {
                            if (i > 0) {
                                element++;
                                weekRevenue = weekRevenue + weekArr[i - 1].Revenue
                            }
                        }

                        weekArr[m - 1].AvgRevenue = weekRevenue / element
                    }
                    console.log(data)
                    console.log(weekArr)

                    this.setState({loading: false, showChart: true, data: weekArr})
                } else {
                    this.setState({loading: false, showChart: true, data: []})
                }
            })
            .catch((error) => {
                this.setState({loading: false})
            });
        this.loadData(0)
    }

    render() {
        const {
            data,
            listCompany,
            pageSize,
            currentPage,
            totalCount,
            showChart,
            loading

        } = this.state;
        return (
            <div className="container-fluid">
                <div className="row half-content">
                    <div className="col-md-8">
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                data={dataBar}
                                margin={{
                                top: 20,
                                right: 30,
                                left: 20,
                                bottom: 5
                            }}>
                                <XAxis dataKey="name"/>
                                <YAxis/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="pv" stackId="a" fill="#8884d8"/>
                                <Bar dataKey="uv" stackId="a" fill="#82ca9d"/>
                            </BarChart>

                        </ResponsiveContainer>
                    </div>
                    <div className="col-md-4">
                        <p
                            style={{
                            lineHeight: '400px',
                            fontSize: 120
                        }}>69%</p>
                    </div>
                </div>
                <div className="row half-content">
                    <div className="col-md-8">
                        <ResponsiveContainer width="100%" height={400}>
                            <ComposedChart
                                data={dataComposed}
                                margin={{
                                top: 20,
                                right: 80,
                                bottom: 20,
                                left: 20
                            }}>
                                <XAxis dataKey="name" label="Pages"/>
                                <YAxis label="Index"/>
                                <Tooltip/>
                                <Legend/>
                                <CartesianGrid stroke='#f5f5f5'/>
                                <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
                                <Bar dataKey='pv' barSize={20} fill='#413ea0'/>
                                <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="col-md-4">
                        <BootstrapTable
                            height={400}
                            className="table-footer"
                            headerStyle={{
                            display: 'none'
                        }}
                            options={{
                            noDataText: '-'
                        }}
                            data={listTicket}>
                            <TableHeaderColumn
                                headerAlign='center'
                                dataField='numberPlate'
                                dataSort={true}
                                width='85'
                                dataAlign='center'>Biển số xe</TableHeaderColumn>
                            <TableHeaderColumn
                                headerAlign='center'
                                dataAlign='center'
                                dataField='duration'
                                dataSort={true}
                                width='100'
                                isKey={true}>Số giờ</TableHeaderColumn>
                            <TableHeaderColumn
                                headerAlign='center'
                                dataSort={true}
                                dataField='cppCode'
                                width='100'
                                dataAlign='center'>Điểm đỗ</TableHeaderColumn>
                            <TableHeaderColumn
                                headerAlign='center'
                                dataSort={true}
                                dataField='time'
                                width='100'
                                dataAlign='center'>Giờ đỗ</TableHeaderColumn>
                        </BootstrapTable>
                    </div>
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