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
            page: 1,
            loading: false,
            errors: {}
        };
        this.loadData = this
            .loadData
            .bind(this)
    }

    loadData(page) {
        this.setState({loading: true})

        var url = "/p/carpp/all/status"

        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const data = response.data.Data

                    if (data.length > 50) {
                        if (this.state.page === 1) {
                            this.state.page = 2;
                            var half_length = Math.ceil(data.length / 2);

                            var leftSide = data.splice(0, half_length);
                            this.setState({loading: false, data: leftSide})
                        } else {
                            this.state.page = 1;
                            var half_length = Math.ceil(data.length / 2);

                            var rightSide = data.splice(half_length, data.length);
                            this.setState({loading: false, data: rightSide})
                        }
                    } else {
                        this.setState({loading: false, data: data})
                    }

                } else {
                    this.setState({loading: false, data: []})
                }
            })
            .catch((error) => {
                this.setState({loading: false})
            });
    }

    componentDidMount() {
        this.loadData(1);
        setInterval(() => {
            this.loadData(this.state.page)
        }, 30000);
    }

    _validate() {
        var errors = {};
        //handle error in here
        return errors;
    }

    render() {
        const {data, page, loading} = this.state;
        return (
            <ResponsiveContainer width="100%" height={380}>
                <BarChart
                    data={data}
                    margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5
                }}>
                    <defs>
                        <linearGradient id="statusBar1" x1="0" y1="0.5" x2="1" y2="0.5">
                            <stop offset="5%" stopColor="#bfbfbf" stopOpacity={1}/>
                            <stop offset="95%" stopColor="#e6e6e6" stopOpacity={1}/>
                        </linearGradient>
                        <linearGradient id="statusBar2" x1="0" y1="0.5" x2="1" y2="0.5">
                            <stop offset="5%" stopColor="#345C89" stopOpacity={1}/>
                            <stop offset="95%" stopColor="#4A7CB6" stopOpacity={1}/>
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="Code"/>
                    <YAxis/>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <Tooltip/>
                    <Legend/>
                    <Bar
                        dataKey="InSessionNumber"
                        stackId="a"
                        fill='url(#statusBar2)'
                        name="Xe tại điểm đỗ"/>
                    <Bar dataKey="Remain" stackId="a" fill='url(#statusBar1)' name="Số ô trống"/>
                </BarChart>

            </ResponsiveContainer>
        )
    }
}

export default StatusChart