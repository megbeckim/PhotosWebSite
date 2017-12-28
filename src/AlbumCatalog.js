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

        const self = this;

        return (
              <div className='album-catalog'>
                {
                    years.map( (year, index) => {
                        return groupedByYear[year].map((album, ix) => {
                            const [, , title] = album.title.match(/([0-9]{4}) - (.*)/);
                            const yearColor = createColor(year);

                            return <div key={`${year}-${ix}`} className='year-and-album'>
                                { ix == 0 && <div key={year} className='year'><div>{year}</div></div> }
                                <div key={ix} className='album' onClick={ () => self.props.onAlbumSelected(album) } >
                                  <img src={album.coverImage} />
                                  <div className='title'>{title}</div>
                                </div>
                            </div>;
                            })
                        })
                }
              </div>
        );
    }
};