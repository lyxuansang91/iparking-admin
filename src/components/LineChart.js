import React from 'react'
import {Line} from 'react-chartjs-2'

const data = {
    labels: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July'
    ],
    datasets: [
        {
            label: 'My First dataset',
            fill: 1,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
                40,
                55,
                60,
                73,
                81,
                85,
                90
            ]
        }, {
            label: 'My Second dataset',
            fill: 2,
            lineTension: 0.1,
            backgroundColor: '#FF6384',
            borderColor: '#FF6384',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#FF6384',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#FF6384',
            pointHoverBorderColor: '#FF6384',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
                30,
                50,
                55,
                69,
                20,
                30,
                40
            ]
        }, {
            label: 'My Third dataset',
            fill: 3,
            lineTension: 0.1,
            backgroundColor: '#205B87',
            borderColor: '#205B87',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: '#205B87',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#205B87',
            pointHoverBorderColor: '#205B874',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
                10,
                15,
                13,
                9,
                6,
                9,
                11
            ]
        }
    ]
};

const options = [];

const LineChart = () => (
    <div>
        <Line data={data} options={options}/>
    </div>
)

export default LineChart