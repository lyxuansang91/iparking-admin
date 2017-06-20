import React from 'react'
import {Bar} from 'react-chartjs-2';
import LineChart from '../components/LineChart'

const data = {
    labels: [
        '06-01-2017',
        '06-02-2017',
        '06-03-2017',
        '06-04-2017',
        '06-05-2017',
        '06-06-2017',
        '06-07-2017'
    ],
    datasets: [
        {
            label: 'Doanh số trên ô',
            type: 'line',

            data: [
                1000000,
                180000,
                590000,
                621000,
                250000,
                400000,
                95000
            ],
            fill: false,
            borderColor: '#FF6384',
            backgroundColor: '#FF6384',
            pointBorderColor: '#FF6384',
            pointBackgroundColor: '#FF6384',
            pointHoverBackgroundColor: '#FF6384',
            pointHoverBorderColor: '#FF6384',
            yAxisID: 'y-axis-2'
        }, {
            type: 'bar',
            label: 'Doanh số',
            data: [
                20000000,
                18000000,
                5900000,
                6210000,
                2500000,
                4000000,
                950000
            ],
            fill: false,
            backgroundColor: '#0D97FF',
            borderColor: '#0D97FF',
            hoverBackgroundColor: '#96CCE5',
            hoverBorderColor: '#96CCE5',
            yAxisID: 'y-axis-1'
        }
    ]
};

const options = {
    responsive: true,
    tooltips: {
        mode: 'label'
    },
    elements: {
        line: {
            fill: false
        }
    },
    legend: {
        display: true,
        position: 'bottom'
    },
    scales: {
        xAxes: [
            {
                'title': 'Thời gian',
                type: 'time',
                time: {
                    unit: 'day',
                    unitStepSize: 1000,
                    displayFormats: {
                        day: 'DD/MM/YYYY'
                    }
                },
                display: true,
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                }
            }

        ],
        yAxes: [
            {
                legend: {
                    display: true,
                    position: 'bottom'
                },
                'title': 'Doanh số',
                type: 'linear',
                display: true,
                position: 'left',
                id: 'y-axis-1',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                },
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);

                        // Convert the array to a string and format the output
                        value = value.join('.');
                        return value + ' đ';
                    }
                }
            }, {
                'title': 'Doanh số trên ô',
                type: 'linear',
                display: true,
                position: 'right',
                id: 'y-axis-2',
                gridLines: {
                    display: false
                },
                labels: {
                    show: true
                },
                ticks: {
                    beginAtZero: true,
                    callback: function (value, index, values) {
                        value = value.toString();
                        value = value.split(/(?=(?:...)*$)/);

                        // Convert the array to a string and format the output
                        value = value.join('.');
                        return value + ' đ';
                    }
                }
            }
        ]
    }
};

const PageContentMain = () => (
    <div>
        <div className="row">
            <div className="col-md-3">
                <a href="#">Báo cáo doanh số</a>
            </div>

            <div className="col-md-1">
                <a href="#">Tất cả</a>
            </div>
            <div className="col-md-1">
                <a href="#">HPC</a>
            </div>
            <div className="col-md-2">
                <a href="#">Đồng Xuân</a>
            </div>
        </div>
        <hr/>
        <Bar data={data} options={options}/>
        <div className="row">
            <div className="col-md-3">
                <h4>
                    <a href="#">Cổng thanh toán</a>
                </h4>
            </div>
        </div>
        <LineChart/>

    </div>
)
export default PageContentMain