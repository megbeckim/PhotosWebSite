import React, { Component } from 'react';
import { AlbumCatalog } from '../albumCatalog/AlbumCatalog';
import { Album } from '../album/Album';
import { Photo } from '../photo/Photo';
import { Map } from '../map/Map';
import { CSSTransition } from 'react-transition-group';
import { HashRouter, Route } from 'react-router-dom'
import { homeRoute, albumRoute, photoRoute, mapRoute } from '../routes';

const animationTimeout = 500;

function provided(value) {
    return value !== null && value !== undefined;
}

function rememberLastProps(WrappedComponent, propsToRemember) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = { };
        }

        static getDerivedStateFromProps(props, state) {
            const newState = propsToRemember.reduce(
                    (acc, name) => {
                        const propValue = props[name];
                        const newValue = provided(propValue) ? propValue : state[name];
                        return { ...acc, [name]: newValue }
                    },
                    { }
                );
            return newState;
        }

        render() {
            const propsArePresent = propsToRemember.every( name => provided(this.state[name]) );
            return propsArePresent ? <WrappedComponent { ...this.props } { ...this.state } /> : null;
        }
    }
}

const AlbumThatRemembersAlbum = rememberLastProps(Album, ['album']);
const PhotoThatRemembersAlbumAndPhotoIx = rememberLastProps(Photo, ['album', 'photoIx']);

export class Site extends Component {
    constructor(props) {
        super(props);

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

        const AlbumCatalogRouteChildren = ({ match }) => {
            return <AlbumCatalog model={ this.state.model } focus={ match.isExact }/>;
        };

        const AlbumRouteChildren = ({ match, history, ...props}) => {
            const album = match && this.state.model.filter(album => album.title === match.params.title)[0];
            const photoIx = match && match.params.photoIx;

            return <CSSTransition in={ match && match.isExact } classNames='container' timeout={ animationTimeout }
                            unmountOnExit >
                        <AlbumThatRemembersAlbum album={ album } history={ history } photoIx={ photoIx }
                            focus={ match && match.isExact && photoIx === undefined} />
                    </CSSTransition>;
        };

        const PhotoRouteChildren = ({ match, history, ...props}) => {
            const album = match && this.state.model.filter(album => album.title === match.params.title)[0];
            const photoIx = match && +match.params.photoIx;

            return <CSSTransition in={ match && match.isExact } classNames='container' timeout={ animationTimeout }
                            unmountOnExit >
                        <PhotoThatRemembersAlbumAndPhotoIx album={ album } photoIx={ photoIx } history={ history }
                            focus={ match }/>
                    </CSSTransition>;
        };

        const MapRouteChildren = ({ match, history, ...props}) => {
            return <CSSTransition in={ match && match.isExact } classNames='container' timeout={ animationTimeout }
                            unmountOnExit >
                        <Map history={ history } data={ this.state.mapData } focus={ match } />
                    </CSSTransition>;
        };

        return (<HashRouter basename={ homeRoute() }>
                <div className='site'>
                    <Route path= { homeRoute() } children={ AlbumCatalogRouteChildren }/>
                    <Route path={ albumRoute(':title') + '/:dummy?/:photoIx?' } children={ AlbumRouteChildren }/>
                    <Route path={ photoRoute(':title', ':photoIx') } children={ PhotoRouteChildren }/>
                    <Route path={ mapRoute() } children={ MapRouteChildren }/>
                </div>
            </HashRouter>);
    }
}