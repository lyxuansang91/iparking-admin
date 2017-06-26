import React, {Component} from 'react'

class ChartUtils {

    static generateMultipleSeries(_labels = [], data_sets = []) {
        let data = {
            labels: _labels,
            datasets: data_sets
        }
        return data;
    }

    static generateDataset(type = 'line', yaxisID = 'y-axis-1', series_data = [], _other = {}) {
        let dataset = {
            type: type,
            data: series_data,
            _other,
            yAxisID: yaxisID
        };
        console.log("data set:", dataset)

        return dataset;
    }

    static genLineDataset(series_data = [], _other_options = {
        fill: false,
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        pointBorderColor: '#FF6384',
        pointBackgroundColor: '#FF6384',
        pointHoverBackgroundColor: '#FF6384',
        pointHoverBorderColor: '#FF6384'
    }) {
        let data_set = {
            type: 'line',
            data: series_data,
            _other_options
        };
        return data_set;
    }

    static genBarDataset(series_data = [], _other_options = {
        fill: false,
        borderColor: '#FF6384',
        backgroundColor: '#FF6384',
        pointBorderColor: '#FF6384',
        pointBackgroundColor: '#FF6384',
        pointHoverBackgroundColor: '#FF6384',
        pointHoverBorderColor: '#FF6384',
        yAxisID: 'y-axis-2'
    }) {
        let dataSet = {
            type: 'bar',
            data: series_data,
            _other_options
        };

        return dataSet;
    }

    generateChartOptions(legend = {}, scales = {}) {
        let options = {
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
                legend
            },
            scales: {
                scales
            }
        }

        return options;
    }
}

export default ChartUtils