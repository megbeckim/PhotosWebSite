import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router-dom'
import { mapRoute, albumRoute } from '../routes';
import { Thumbnail } from '../thumbnail/Thumbnail';

const albumTitlePattern = /(.*?) (.*)/;
const screenChangeEvents = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange'];
const img = <img/>;

function isFullScreen() {
    const doc = window.document;

    return doc.fullscreenElement
        || doc.mozFullScreenElement
        || doc.webkitFullscreenElement
        || doc.msFullscreenElement;
}

export class AlbumCatalog extends Component {
    constructor(props) {
        super(props);
        this.albumCatalogRef = React.createRef();
        this.state = { fullScreen: false };
    }

    updateFullScreenState() {
        this.setState({ fullScreen: isFullScreen() });
    }

    componentDidMount() {
        this.setState( { albumCatalogRefCurrent: this.albumCatalogRef.current } );
        screenChangeEvents.forEach(
            eventType => document.addEventListener(eventType, this.updateFullScreenState.bind(this), false)
        );
    }

    toggleFullScreen() {
        const doc = window.document;
        const docEl = doc.documentElement;

        const requestFullScreen = docEl.requestFullscreen
            || docEl.mozRequestFullScreen
            || docEl.webkitRequestFullScreen
            || docEl.msRequestFullscreen;
        const cancelFullScreen = doc.exitFullscreen
            || doc.mozCancelFullScreen
            || doc.webkitExitFullscreen
            || doc.msExitFullscreen;

        if(isFullScreen()) {
            cancelFullScreen.call(doc);
        } else {
            requestFullScreen.call(docEl);
        }
    }

    render() {
        if (!this.props.model) return null;

        const groupedByYear = this.props.model.reduce((acc, album) => {
                        const [, year] = album.title.match(albumTitlePattern);
                        acc[year] =  acc[year] || [];
                        acc[year].push(album);
                        return acc;
                    }, {});

        const years = Object.keys(groupedByYear).sort().reverse();

        return (
            <div className='album-catalog-container'>
                <div className='album-catalog' ref={this.albumCatalogRef}>
                    <Headroom disable={ !this.state.albumCatalogRefCurrent }
                            parent={ () => this.state.albumCatalogRefCurrent }>
                        <div className='header'>
                            <div className='branding'>
                                <div>Fagan</div>
                                <div>Photos<div>.com</div></div>
                            </div>
                            <div className='spring'></div>
                            <img className='resizeScreen'
                                src={ `Full-Screen-${ this.state.fullScreen ? 'Collapse' : 'Expand'}-128.png` }
                                onClick={ this.toggleFullScreen.bind(this) } />
                            <Link to={ mapRoute() }>
                                <img className='map fas fa-globe' />
                            </Link>
                        </div>
                    </Headroom>
                    <div className='album-catalog-wrapper'>
                          <div className='album-catalog'>
                            {
                                years.map( (year, index) => {
                                    return groupedByYear[year].map((album, ix) => {
                                        const [, , title] = album.title.match(albumTitlePattern);
                                        const folder = album.folder.substring('albums/'.length);

                                        return <div key={`${year}-${ix}`} className='year-and-album'>
                                            { ix == 0 && <div key={ year } className='year'><div>{ year }</div></div> }
                                            <div key={ix} className='album'>
                                                <Link to={ albumRoute(album.title) }>
                                                    <Thumbnail component={ img } src={ width => `thumb.php5?album=${folder}&fileName=${album.coverImage}&width=${width}` } />
                                                    <div className='title'>{ title }</div>
                                                </Link>
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