import React, { Component } from 'react';

import model from './model.js';
import createColor from './colours.js';

export class AlbumCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            };
    }

    render() {
        const groupedByYear = model.reduce((acc, album) => {
                        const [, year] = album.title.match(/([0-9]{4}) (.*)/);
                        acc[year] =  acc[year] || [];
                        acc[year].push(album);
                        return acc;
                    }, {});

        const years = Object.keys(groupedByYear).sort().reverse();

        return (
              <div className='album-catalog'>
                {
                    years.map( (year, yearIndex) => {
                        const yearColor = createColor(year);

                        return <div key={yearIndex} className='year-and-album'>
                                <div className='year' style={{'backgroundColor': yearColor}}>{year}</div>
                                {
                                    groupedByYear[year].map((album, albumIndex) => {
                                        const [, , title] = album.title.match(/([0-9]{4}) - (.*)/);

                                        return <div key={albumIndex} className='album' onClick={this.props.onAlbumSelected} >
                                              <img src={album.coverImage} />
                                              <div className='title'>{title}</div>
                                            </div>
                                        })
                                }
                            </div>;
                        })
                }
              </div>
        );
    }
};