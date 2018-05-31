import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { homeRoute } from '../routes';
import { Chart } from 'react-google-charts';
import classNames from 'classnames';

const seaColour = '#000';
const visitedColour = '#8f8';
const wantToVisitColour = '#dd0';
const notVisitedColour = '#888';
const missingColour = '#f00';

export class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { mapRendered: false };

        fetch('https://script.google.com/macros/s/AKfycby0xnh7hak2y71I2Ee4FK_Q5Ket9ZEkO82X3zSTHzzAQQsN02Y/exec')
            .then(response => response.json())
            .then(data => this.setState({ data }));

    }

    render() {
        const options = {
            legend: 'none',
            tooltip: {
                    isHtml: true,
                    textStyle: { color: 'white' }
                },
            colorAxis: {colors: [notVisitedColour, wantToVisitColour, visitedColour]},
            backgroundColor: seaColour,
            datalessRegionColor: missingColour
        };

        const chartEvents = [
            { eventName: 'ready', callback: () => {
                    this.setState({ mapRendered: true });
                }
             }
        ];

        return (
            <div className='map-container'>
                <Link to={ homeRoute() }><div className='home'><img className='fas fa-home'/></div></Link>
                { this.state.data &&
                    <div className={ classNames('map', { hidden: !this.state.mapRendered }) }>
                        <Chart
                            chartType="GeoChart"
                            data={ this.state.data }
                            options={ options }
                            width="100%"
                            height="100%"
                            chartEvents={ chartEvents }
                            />
                    </div>
                }
                <div className='legend'>
                    <ul>
                        <li className='visited'>Visited</li>
                        <li className='want-to-visit'>To visit</li>
                    </ul>
                </div>
            </div>
          );
    }
};