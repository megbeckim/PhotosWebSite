import React, { Component, createRef } from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router-dom'
import { mapRoute, albumRoute } from '../routes';
import { Thumbnail } from '../thumbnail/Thumbnail';
import { Model } from '../Types';

const albumTitlePattern = /(.*?) (.*)/;
const screenChangeEvents = ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'msfullscreenchange'];

type FullScreenDocument = {
    fullscreenElement?: any,
    mozFullScreenElement?: any,
    webkitFullscreenElement?: any,
    msFullscreenElement?: any,
    exitFullscreen?: any,
    mozCancelFullScreen?: any,
    webkitExitFullscreen?: any,
    msExitFullscreen?: any
};

type FullScreenElement = {
    requestFullscreen?: any,
    mozRequestFullScreen?: any,
    webkitRequestFullScreen?: any,
    msRequestFullscreen?: any
};

function isFullScreen() {
    const doc = window.document as any as FullScreenDocument;

    return doc.fullscreenElement
        || doc.mozFullScreenElement
        || doc.webkitFullscreenElement
        || doc.msFullscreenElement;
}

type Props = { model: Model[], focus: boolean };
type State = { albumCatalogRefCurrent?: HTMLDivElement, fullScreen?: boolean };

export class AlbumCatalog extends Component<Props, State> {
    private albumCatalogRef = createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
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

    componentDidUpdate() {
        if(this.props.focus) {
            this.albumCatalogRef.current.focus();
        }
    }

    toggleFullScreen() {
        const doc = window.document as any as FullScreenDocument;
        const docEl = window.document.documentElement as any as FullScreenElement;

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

        type GroupedByYear = { [key: string]: Model[] };
        const groupedByYear = this.props.model.reduce((acc: GroupedByYear, album: Model) => {
                        const [, year] = album.title.match(albumTitlePattern);
                        acc[year] = acc[year] || [];
                        acc[year].push(album);
                        return acc;
                    }, {} as GroupedByYear);

        const years = Object.keys(groupedByYear).sort().reverse();

        return (
            <div className='album-catalog-container'>
                <div className='album-catalog' ref={this.albumCatalogRef} tabIndex={-1}>
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
                                        const [, , titleWithoutYear] = album.title.match(albumTitlePattern);
                                        const { folder, coverImage } = album;
                                        const abbreviatedFolder = folder.substring('albums/'.length);

                                        return <div key={`${year}-${ix}`} className='year-and-album'>
                                            { ix == 0 && <div key={ year } className='year'><div>{ year }</div></div> }
                                            <div key={ix} className='album'>
                                                <Link to={ albumRoute(album.title) }>
                                                    <Thumbnail album={ abbreviatedFolder } photo={ coverImage } />
                                                    <div className='title'>{ titleWithoutYear }</div>
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