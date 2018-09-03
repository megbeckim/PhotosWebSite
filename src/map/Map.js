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

const ESCAPE_KEY_CODE = 27;

export class Map extends Component {
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();

        this.state = { mapRendered: false };
    }

    componentDidMount() {
        this.mapRef.current.focus();
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

        const data = [
            ['Country', 'Visited', {type: 'string', role: 'tooltip'}],
            ...this.props.data
        ];

        return (
            <div className='map-container'
                    ref={ this.mapRef } tabIndex='0'
                    onKeyUp={ e => { if(e.keyCode === ESCAPE_KEY_CODE) this.props.history.push(homeRoute()); } }>
                <Link to={ homeRoute() }><div className='home'><img className='fas fa-home'/></div></Link>
                { this.props.data &&
                    <div key='map' className={ classNames('map', { hidden: !this.state.mapRendered }) }>
                        <Chart
                            chartType="GeoChart"
                            data={ data }
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