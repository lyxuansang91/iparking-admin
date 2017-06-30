import React, {Component} from 'react'
import {PagingState} from '@devexpress/dx-react-grid';
import {Grid, TableView, TableHeaderRow, PagingPanel} from '@devexpress/dx-react-grid-bootstrap3';
import Loading from '../assets/js/loading'

const URL = 'https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems';

class DataGridDemo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            columns: [
                {
                    name: 'OrderNumber',
                    title: 'Order Number'
                }, {
                    name: 'OrderDate',
                    title: 'Order Date'
                }, {
                    name: 'StoreCity',
                    title: 'Store City'
                }, {
                    name: 'StoreState',
                    title: 'Store State'
                }, {
                    name: 'Employee',
                    title: 'Employee'
                }, {
                    name: 'SaleAmount',
                    title: 'Sale Amount'
                }
            ],
            rows: [],
            totalCount: 0,
            pageSize: 20,
            loading: true
        };

        this.changeCurrentPage = this
            .changeCurrentPage
            .bind(this);
        this.loadData = this
            .loadData
            .bind(this)

        this.queryString = this
            .queryString
            .bind(this)
    }

    componentDidMount() {
        this.loadData(0);
    }

    changeCurrentPage(currentPage) {
        this.loadData(currentPage);
    }

    queryString(currentPage) {
        const {pageSize} = this.state;

        const url = `${URL}?take=${pageSize}&skip=${pageSize * currentPage}`;
        console.log("url:", url, ", current page:", currentPage)
        return url
    }

    loadData(currentPage) {
        this.setState({loading: true})
        console.log("current page:", currentPage)
        const queryString = this.queryString(currentPage);
        if (queryString === this.lastQuery) {
            this.setState({loading: false});
            return;
        }

        console.log("query string:", queryString)
        fetch(queryString)
            .then(response => response.json())
            .then(data => {
                console.log("done")
                this.setState({rows: data.items, totalCount: data.totalCount, loading: false})
            })
            .catch(() => this.setState({loading: false}));
        this.lastQuery = queryString;
    }

    render() {
        const {
            rows,
            columns,
            pageSize,
            currentPage,
            totalCount,
            loading
        } = this.state;

        return (
            <div>
                <Grid rows={rows} columns={columns}>
                    <PagingState
                        currentPage={currentPage}
                        onCurrentPageChange={this.changeCurrentPage}
                        pageSize={pageSize}
                        totalCount={totalCount}/>

                    <TableView
                        tableCellTemplate={({row, column, style}) => {
                        if (column.name == 'OrderNumber') {
                            return <td
                                style={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                textAlign: 'left'
                            }}>
                                <a
                                    href="#"
                                    style={{
                                    textDecoration: 'none'
                                }}>{row.OrderNumber}</a>
                            </td>
                        }
                        undefined
                    }}/>
                    <TableHeaderRow/>
                    <PagingPanel/>
                </Grid>
                {loading && <Loading/>}
            </div>
        );
    }
}

export default DataGridDemo