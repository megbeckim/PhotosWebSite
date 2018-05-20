import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { homeRoute } from '../routes';
import { Chart } from 'react-google-charts';

export class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { };

        fetch('https://script.google.com/macros/s/AKfycby0xnh7hak2y71I2Ee4FK_Q5Ket9ZEkO82X3zSTHzzAQQsN02Y/exec')
            .then(response => response.json())
            .then(data => this.setState({ data }));

    }

    render() {
        const options = {
            legend: 'none',
            tooltip: {
                    isHtml: true
                },
            colorAxis: {colors: ['brown', 'yellow', 'green']},
            backgroundColor: '#888',
            datalessRegionColor: '#f8bbd0'
        };

        return (
            <div className='map-container'>
                <Link to={ homeRoute() }><div className='home'><img className='fas fa-home'/></div></Link>
                { this.state.data && <Chart
                    className='chart'
                    chartType="GeoChart"
                    data={ this.state.data }
                    options={ options }
                    width="100%"
                    height="100%"
                    />
                }
            </div>
          );
    }
};