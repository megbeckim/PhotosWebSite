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

        fetch('model.json')
            .then(response => response.json())
            .then(model => this.setState({ model }));
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
                        <Map history={ history }/>
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