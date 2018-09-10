import React, { Component } from 'react';
import { AlbumCatalog } from '../albumCatalog/AlbumCatalog';
import { Album } from '../album/Album';
import { Photo } from '../photo/Photo';
import { Map } from '../map/Map';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { HashRouter, Route } from 'react-router-dom'
import { homeRoute, albumRoute, photoRoute, mapRoute } from '../routes';

const animationTimeout = 500;

function prepareHistory() {
    const hash = window.location.hash;
    console.log('hash', window.location.hash);

    const homeRegex = new RegExp('^#' + homeRoute() + '$');
    const albumRegex = new RegExp('^#' + albumRoute('([^/]+)') + '$');
    const photoRegex = new RegExp('^#' + photoRoute('([^/]+)','(.+)') + '$');
    const mapRegex = new RegExp('^#' + mapRoute() + '$');

    const homeMatch = homeRegex.exec(hash);
    const albumMatch = albumRegex.exec(hash);
    const photoMatch = photoRegex.exec(hash);
    const mapMatch = mapRegex.exec(hash);

    let newHistory;

    if (photoMatch) {
        console.log('photo match', photoMatch);
        newHistory = [ '#/' + homeRoute(), '#' + albumRoute(photoMatch[1]), hash ];
    } else if (albumMatch) {
        console.log('album match', albumMatch);
        newHistory = [ '#/' + homeRoute(), hash ];
    } if (mapMatch) {
        console.log('map match', mapMatch);
        newHistory = [ '#/' + homeRoute(), hash ];
    } else {
        console.log('no match');
        newHistory = [ hash ];
    }

    console.log('new history is', newHistory);
    const [ first, ...rest ] = newHistory;

    if (first !== hash) {
        window.history.replaceState({}, {}, first);
    }
    rest.forEach( url => {
        window.history.pushState({}, {}, url);
    });
}

export class Site extends Component {
    constructor(props) {
        super(props);

        prepareHistory();

        this.state = { };

        fetch('/model.json')
            .then(response => response.json())
            .then(model => this.setState({ model }));

        fetch('/mapData.json')
            .then(response => response.json())
            .then(mapData => this.setState({ mapData }));
    }

    render() {
        if (!this.state.model) return null;

        const AlbumRouteChildren = ({ match, history, ...props}) => {
            const album = match && this.state.model.filter(album => album.title === match.params.title)[0];
            const photoIx = match && match.params.photoIx;

            return (<TransitionGroup>
                    { album && <CSSTransition classNames='container' timeout={ animationTimeout }>
                        <Album album={ album } history={ history } photoIx={ photoIx } focus={ photoIx === undefined }/>
                    </CSSTransition> }
                </TransitionGroup>);
        };

        const PhotoRouteChildren = ({ match, history, ...props}) => {
            const album = match && this.state.model.filter(album => album.title === match.params.title)[0];

            return (<TransitionGroup>
                    { album && <CSSTransition classNames='container' timeout={ animationTimeout }>
                        <Photo album={ album } photoIx={ +match.params.photoIx } history={ history }/>
                    </CSSTransition> }
                </TransitionGroup>);
        };

        const MapRouteChildren = ({ match, history, ...props}) => {
            return (<TransitionGroup>
                    { match && <CSSTransition classNames='container' timeout={ animationTimeout }>
                        <Map history={ history } data={ this.state.mapData } />
                    </CSSTransition> }
                </TransitionGroup>);
        };

        return (<HashRouter basename={ homeRoute() }>
                <div className='site'>
                    <AlbumCatalog model={ this.state.model }/>
                    <Route path={ albumRoute(':title') + '/:dummy?/:photoIx?' } children={ AlbumRouteChildren }/>
                    <Route path={ photoRoute(':title', ':photoIx') } children={ PhotoRouteChildren }/>
                    <Route path={ mapRoute() } children={ MapRouteChildren }/>
                </div>
            </HashRouter>);
    }
}