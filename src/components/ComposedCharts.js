import React, {Component} from 'react'
import {
    ComposedChart,
    Line,
    Area,
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

        axios
            .get("http://admapi.upark.vn/p/report_monthly_revenue")
            .then((response) => {
                const data = response.data;
                this.setState({loading: false, data: data.Data})
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
                            <ComposedChart data={data}>
                                <XAxis dataKey="Day"/>
                                <YAxis yAxisId='1' width={100} tickFormatter={currencyFormat}/>
                                <YAxis
                                    yAxisId='2'
                                    width={100}
                                    orientation='right'
                                    tickFormatter={currencyFormat}/>
                                <Tooltip formatter={currencyFormat}/>
                                <Legend/>
                                <CartesianGrid stroke='#f5f5f5'/>
                                <Bar
                                    yAxisId='1'
                                    dataKey='Revenue'
                                    barSize={100}
                                    fill='#0D97FF'
                                    name="Doanh số"/>
                                <Line
                                    yAxisId='2'
                                    type='monotone'
                                    dataKey='RevenuePerUnit'
                                    stroke='#FF6384'
                                    name="Doanh số trên ô"/>
                            </ComposedChart>
                        </ResponsiveContainer>
                        {loading && <Loading/>}
                    </div>
                </div>
            </div>

        )
    }
}

export default ComposedCharts