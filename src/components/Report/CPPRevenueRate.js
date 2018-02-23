import React, { Component } from 'react'
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import {
    ComposedChart,
    Line,
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
import Loading from '../../assets/js/loading'
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

class CPPRevenueRate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            listCompany: [],
            fromTime: moment()
                .subtract(2, 'months')
                .subtract(1, 'days'),
            toTime: moment().subtract(1, 'days'),
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
        var url = "report/provider/list"

        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const provderList = response.data.Data
                    this.setState({ listCompany: provderList })
                } else {
                    this.setState({ listCompany: [] })
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
            });
    }

    componentDidMount() {
        this.loadData(0)
    }

    changeCurrentPage(currentPage) {
        this.loadData(currentPage)
    }

    handleChangeFromTime(date) {
        this.setState({ fromTime: date });
    }

    handleChangeToTime(date) {
        this.setState({ toTime: date });
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

        this.setState({ loading: true })

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
        }).unix();

        var url = "/report/report_monthly_revenue?cpp_code=" + this.refs.cpp_code.value + "&from_time=" + fromTime + "&to_time=" + toTime
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

                    this.setState({ loading: false, showChart: true, data: weekArr })
                } else {
                    this.setState({ loading: false, showChart: true, data: [] })
                }
            })
            .catch((error) => {
                this.setState({ loading: false })
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
                <div className="row">
                    <form
                        ref='report_monthly_revenue_form'
                        className=""
                        onSubmit={this.onSubmitForm}>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label for="company">Công ty</label>
                                    <select className="form-control" name="company" ref="company">
                                        {listCompany
                                            .map(function (company) {
                                                return <option key={company.Id} value={company.Id}>{company.Fullname.String}</option>;
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-md-6 form-group">
                                    <label for="company">Điểm đỗ</label>
                                    <input
                                        type="text"
                                        name="car_parking_place"
                                        ref="cpp_code"
                                        className="form-control" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <label for="fromTime">Từ ngày</label>
                                    <br />
                                    <DatePicker
                                        className="form-control"
                                        name="from_time"
                                        dateFormat="DD/MM/YYYY"
                                        selected={this.state.fromTime}
                                        onChange={this.handleChangeFromTime} />
                                </div>

                                <div className="col-md-6 form-group">
                                    <label for="toTime">Đến ngày</label>
                                    <br />
                                    <DatePicker
                                        className="form-control"
                                        name="to_time"
                                        dateFormat="DD/MM/YYYY"
                                        selected={this.state.toTime}
                                        onChange={this.handleChangeToTime} />
                                </div>
                            </div>
                        </div>

                        <div
                            className="col-md-2"
                            style={{
                                marginTop: '24px'
                            }}>
                            <button type="submit" className="btn btn-primary">Tra cứu</button>
                        </div>

                    </form>
                </div>
                <div
                    className="row"
                    style={{
                        marginTop: '25px'
                    }}>
                    {showChart && <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={data}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0.5" x2="1" y2="0.5">
                                    <stop offset="5%" stopColor="#345C89" stopOpacity={1} />
                                    <stop offset="95%" stopColor="#4A7CB6" stopOpacity={1} />
                                </linearGradient>

                            </defs>
                            <XAxis dataKey="Week" />
                            <YAxis yAxisId='1' width={100} tickFormatter={currencyFormat} />
                            <YAxis
                                yAxisId='2'
                                orientation='right'
                                width={100}
                                tickFormatter={currencyFormat} />
                            <Tooltip formatter={currencyFormat} />
                            <Legend verticalAlign='bottom' height={36} />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Bar
                                yAxisId='1'
                                dataKey='Revenue'
                                barSize={100}
                                fill='url(#colorUv)'
                                name="Doanh số" />
                            <Line
                                yAxisId='2'
                                type='monotone'
                                dataKey='AvgRevenue'
                                stroke='#FF6384'
                                strokeWidth={3}
                                name="Bình quân" />
                        </ComposedChart>

                    </ResponsiveContainer>}
                    {loading && <Loading />}

                </div>
            </div>
        )
    }
}

export default CPPRevenueRate