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

class StatusChart extends Component {

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

        var url = "/p/carpp/all/status"

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
                    <XAxis dataKey="Code"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar
                        dataKey="InSessionNumber"
                        stackId="a"
                        fill="#1AA0E2"
                        name="số ô trong phiên/quá giờ"/>
                    <Bar dataKey="Remain" stackId="a" fill="#C9947F" name="số ô trống"/>
                </BarChart>

            </ResponsiveContainer>
        )
    }
}

export default StatusChart