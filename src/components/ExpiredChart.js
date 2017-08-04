import React, {Component} from 'react'
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
import Loading from '../assets/js/loading'
import axios from 'axios'
import moment from 'moment';

class ExpiredChart extends Component {

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
        this.setState({loading: true})

        var url = "/p/carpp/all/get_expires"

        console.log(url)
        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const data = response.data.Data

                    this.setState({loading: false, data: data})
                } else {
                    this.setState({loading: false, data: []})
                }
            })
            .catch((error) => {
                this.setState({loading: false})
            });
    }

    componentDidMount() {
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
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
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
        )
    }
}

export default ExpiredChart