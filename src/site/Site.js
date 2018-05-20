import React, { Component } from 'react';
import { AlbumCatalog } from '../albumCatalog/AlbumCatalog';
import { Album } from '../album/Album';
import { Photo } from '../photo/Photo';
import { Map } from '../map/Map';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { HashRouter, Route } from 'react-router-dom'
import { homeRoute, albumRoute, photoRoute, mapRoute } from '../routes';

const animationTimeout = 500;

export class Site extends Component {
    constructor(props) {
        super(props);

        this.state = { };

        fetch('https://script.google.com/macros/s/AKfycbxtkKbLArbu1ehXE-Rv-is5EGlwDFejP5rBYluB/exec')
            .then(response => response.json())
            .then(model => this.setState({ model }));
    }

    render() {
        if (!this.state.model) return null;

        const AlbumRoute = ({ match, ...props}) => {
            const album = match && this.state.model.filter(album => album.title === match.params.title)[0];

            return (<TransitionGroup>
                    { album && <CSSTransition classNames='container' timeout={ animationTimeout }>
                        <Album album={ album }/>
                    </CSSTransition> }
                </TransitionGroup>);
        };

        const PhotoRoute = ({ match, history, ...props}) => {
            const album = match && this.state.model.filter(album => album.title === match.params.title)[0];

            return (<TransitionGroup>
                    { album && <CSSTransition classNames='container' timeout={ animationTimeout }>
                        <Photo album={ album } photoIx={ +match.params.photoIx } history={ history }/>
                    </CSSTransition> }
                </TransitionGroup>);
        };

        const MapRoute = ({ match, ...props}) => {
            return (<TransitionGroup>
                    { match && <CSSTransition classNames='container' timeout={ animationTimeout }>
                        <Map/>
                    </CSSTransition> }
                </TransitionGroup>);
        };

        return (<HashRouter basename={ homeRoute() }>
                <div className='site'>
                    <AlbumCatalog model={ this.state.model }/>
                    <Route path={ albumRoute(':title') } children={ AlbumRoute }/>
                    <Route path={ photoRoute(':title', ':photoIx') } children={ PhotoRoute }/>
                    <Route path={ mapRoute() } children={ MapRoute }/>
                </div>
            </HashRouter>);
    }
}