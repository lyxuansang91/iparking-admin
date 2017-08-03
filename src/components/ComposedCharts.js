import React, {Component} from 'react'
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
import axios from 'axios';
import Loading from '../assets/js/loading';
import moment from 'moment';

const currencyFormat = (uv) => {

    if (Math.floor(uv) == 0) {
        return " 0 đ "
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

    return priceString + " đ "
}

class ComposedCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        };

        this.loadData = this
            .loadData
            .bind(this)
    }

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        this.setState({loading: true})

        const toTime = moment().unix()

        const fromTime = moment()
            .subtract(89, "days")
            .unix() - 86340
        var url = "/p/report_monthly_revenue?from_time=" + fromTime + "&to_time=" + toTime

        axios
            .get(url)
            .then((response) => {
                const data = response.data.Data;

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

                console.log(weekArr)

                if (response.data.Error.Code == 200) {
                    this.setState({loading: false, data: weekArr})
                } else {
                    this.setState({loading: false})
                }
            })
            .catch((error) => {
                console.log("error:", error)
                this.setState({loading: false})
            })
    }

    render() {

        const {data, loading} = this.state

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <ResponsiveContainer width="100%" height={400}>
                            <ComposedChart
                                data={data}
                                margin={{
                                top: 0,
                                right: 100,
                                left: 5,
                                bottom: 0
                            }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0.5" x2="1" y2="0.5">
                                        <stop offset="5%" stopColor="#345C89" stopOpacity={1}/>
                                        <stop offset="95%" stopColor="#4A7CB6" stopOpacity={1}/>
                                    </linearGradient>

                                </defs>
                                <XAxis dataKey="Week"/>
                                <YAxis yAxisId='1' width={100} tickFormatter={currencyFormat}/> {/*<YAxis
                                    yAxisId='2'
                                    orientation='right'
                                    width={100}
                                    tickFormatter={currencyFormat}/>*/}
                                <Tooltip formatter={currencyFormat}/>
                                <Legend verticalAlign='top' height={36}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Bar
                                    yAxisId='1'
                                    dataKey='Revenue'
                                    barSize={100}
                                    fill='url(#colorUv)'
                                    name="Doanh số"/>
                                <Line
                                    yAxisId='1'
                                    type='monotone'
                                    dataKey='AvgRevenue'
                                    stroke='#FF6384'
                                    strokeWidth={3}
                                    name="Bình quân"/>
                            </ComposedChart>

                        </ResponsiveContainer>

                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart
                                data={data}
                                margin={{
                                top: 0,
                                right: 100,
                                left: 5,
                                bottom: 0
                            }}>

                                <XAxis dataKey="Week"/>
                                <YAxis width={100} tickFormatter={currencyFormat}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip formatter={currencyFormat}/>
                                <Legend iconType="square"/>
                                <Area
                                    type='monotone'
                                    dataKey='SMSRevenue'
                                    stackId="1"
                                    name="SMS"
                                    stroke='#8884d8'
                                    fill='#8884d8'/>
                                <Area
                                    type='monotone'
                                    dataKey='CardRevenue'
                                    stackId="1"
                                    name="Thẻ thanh toán"
                                    stroke='#82ca9d'
                                    fill='#82ca9d'/>
                                <Area
                                    type='monotone'
                                    dataKey='OtherRevenue'
                                    stackId="1"
                                    name="Khác"
                                    stroke='#ffc658'
                                    fill='#ffc658'/>
                            </AreaChart>
                        </ResponsiveContainer>
                        {loading && <Loading/>}
                    </div>
                </div>
            </div>

        )
    }
}

export default ComposedCharts