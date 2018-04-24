import React, { Component } from 'react';
import Headroom from 'react-headroom';
import classNames from 'classnames';

export class AlbumCatalog extends Component {
    constructor(props) {
        super(props);
        this.albumCatalogRef = React.createRef();
        this.state = { };
    }

    componentDidMount() {
        this.setState( { albumCatalogRefCurrent: this.albumCatalogRef.current } );
    }

    render() {
        const groupedByYear = this.props.model.reduce((acc, album) => {
                        const [, year] = album.title.match(/([0-9]{4}) (.*)/);
                        acc[year] =  acc[year] || [];
                        acc[year].push(album);
                        return acc;
                    }, {});

        const years = Object.keys(groupedByYear).sort().reverse();

        return (
            <div className={ classNames('album-catalog-container', { open: !this.props.selectedAlbum }) }>
                <div className='album-catalog' ref={this.albumCatalogRef}>
                    <Headroom disable={ !this.state.albumCatalogRefCurrent }
                            parent={ () => this.state.albumCatalogRefCurrent }>
                        <div className='header'>
                            <div className='branding'>
                                <div>Fagan</div>
                                <div>Photos<div>.com</div></div>
                                <div></div>
                            </div>
                        </div>
                    </Headroom>
                    <div className='album-catalog-wrapper'>
                          <div className='album-catalog'>
                            {
                                years.map( (year, index) => {
                                    return groupedByYear[year].map((album, ix) => {
                                        const [, , title] = album.title.match(/([0-9]{4}) - (.*)/);

                                        return <div key={`${year}-${ix}`} className='year-and-album'>
                                            { ix == 0 && <div key={year} className='year'><div>{year}</div></div> }
                                            <div key={ix} className='album' onClick={ () => this.props.onAlbumSelected(album) } >
                                              <img src={album.coverImage} />
                                              <div className='title'>{title}</div>
                                            </div>
                                        </div>;
                                        })
                                    })
                            }
                          </div>
                    </div>
                </div>
            </div>
        );
    }
};