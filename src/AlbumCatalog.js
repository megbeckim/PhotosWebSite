import React, { Component } from 'react';

import model from './model.js';

function random(seed) {
    var x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

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
                    years.map( (year, index) => {
                        return groupedByYear[year].map((album, ix) => {
                            const [, , title] = album.title.match(/([0-9]{4}) - (.*)/);
                            const yearColor = `hsl(${(random(year) * 360)|0}, 100%, 70%)`;

                            return <div key={`${year}-${ix}`} className='year-and-album'>
                                { ix == 0 && <div key={year} className='year' style={{'backgroundColor': yearColor}}>{year}</div> }
                                <div key={ix} className='album' onClick={this.props.onAlbumSelected} >
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