import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom'
import { homeRoute } from '../routes';
import { Chart } from 'react-google-charts';
import classNames from 'classnames';
import { History } from 'history';

const seaColour = '#000';
const visitedColour = '#6767e6';
const notVisitedColour = '#fff';
const wantToVisitColour = notVisitedColour;
const missingColour = '#fee';

const ESCAPE_KEY_CODE = 27;

type Props = { data: string[][], history: History };
type State = { mapRendered: boolean };

export class Map extends Component<Props, State> {
    private mapRef = createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
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

        const data = [
            ['Country', 'Visited', {type: 'string', role: 'tooltip'}],
            ...this.props.data
        ];

        return (
            <div className='map-container'
                    ref={ this.mapRef } tabIndex={-1}
                    onKeyUp={ e => { if(e.keyCode === ESCAPE_KEY_CODE) this.props.history.push(homeRoute()); } }>
                <Link to={ homeRoute() }><div className='home'><img className='fas fa-home'/></div></Link>
                { this.props.data &&
                    <div key='map' className={ classNames('map', { hidden: !this.state.mapRendered }) }>
                        <Chart
                            chartType='GeoChart'
                            data={ data }
                            options={ options }
                            width='100%'
                            height='100%'
                            chartEvents={
                                [
                                    {
                                        eventName: 'ready',
                                        callback: () => {
                                            this.setState({ mapRendered: true });
                                        }
                                    }
                                ]
                            }
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