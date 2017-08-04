import React, {Component} from 'react'
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import Loading from '../assets/js/loading'
import axios from 'axios'
import moment from 'moment';

const timeRender = (time) => {
    return moment
        .unix(time)
        .format("HH:mm");
}

class LastestTickets extends Component {

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

        var url = "/p/ticket/daily/lastest?size=50"

        console.log(url)
        axios
            .get(url)
            .then((response) => {
                if (response.data.Error.Code == 200) {
                    const data = response.data.Data

                    for (var i = 0; i < data.length; i++) {
                        data[i].duration = (data[i].To_time - data[i].From_time) / 3600 + " giờ"
                    }

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
        const {data, loading, errors} = this.state;
        return (
            <div>
                <BootstrapTable
                    height={400}
                    className="table-footer"
                    headerStyle={{
                    display: 'none'
                }}
                    options={{
                    noDataText: '-'
                }}
                    data={data}>
                    <TableHeaderColumn
                        headerAlign='center'
                        dataField='Number_plate'
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
                        dataField='Cpp_code'
                        width='100'
                        dataAlign='center'>Điểm đỗ</TableHeaderColumn>
                    <TableHeaderColumn
                        headerAlign='center'
                        dataSort={true}
                        dataFormat={timeRender}
                        dataField='From_time'
                        width='100'
                        dataAlign='center'>Giờ đỗ</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}

export default LastestTickets