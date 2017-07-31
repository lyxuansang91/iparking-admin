import React, {Component} from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    Legend
} from 'recharts';
import axios from 'axios';
import Loading from '../assets/js/loading';

const currencyFormat = (uv) => {

    if (Math.floor(uv) == 0) {
        return "0đ"
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

    return priceString + "đ"
}

class StackAreaChart extends Component {

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

        axios
            .get("/p/report_monthly_revenue")
            .then((response) => {
                var listPayment = response.data.Data;

                for (var i = 0; i < listPayment.length; i++) {
                    listPayment[i].Card = listPayment[i].ATM + listPayment[i].VisaMaster
                    listPayment[i].Other = listPayment[i].Promotion + listPayment[i].InternetBanking
                }

                this.setState({loading: false, data: listPayment})
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
                        <ResponsiveContainer width="100%" height={450}>
                            <AreaChart
                                data={data}
                                margin={{
                                top: 30,
                                right: 20,
                                left: 20,
                                bottom: 50
                            }}>
                                <XAxis dataKey="Day"/>
                                <YAxis width={100} tickFormatter={currencyFormat}/>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <Tooltip formatter={currencyFormat}/>
                                <Legend iconType="square"/>
                                <Area
                                    type='monotone'
                                    dataKey='SMS'
                                    stackId="1"
                                    stroke='#8884d8'
                                    fill='#8884d8'/>
                                <Area
                                    type='monotone'
                                    dataKey='Card'
                                    stackId="1"
                                    name="Thẻ thanh toán"
                                    stroke='#82ca9d'
                                    fill='#82ca9d'/>
                                <Area
                                    type='monotone'
                                    dataKey='Other'
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

export default StackAreaChart