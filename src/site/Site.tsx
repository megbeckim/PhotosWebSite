import React, { Component } from 'react';
import { AlbumCatalog } from '../albumCatalog/AlbumCatalog';
import { Album } from '../album/Album';
import { Photo } from '../photo/Photo';
import { Map } from '../map/Map';
import { CSSTransition } from 'react-transition-group';
import { HashRouter, Route, RouteComponentProps } from 'react-router-dom'
import { homeRoute, albumRoute, photoRoute, mapRoute } from '../routes';
import { Model } from '../Types';
import { History } from 'history';

const animationTimeout = 500;

interface Match<P> {
  params: P;
  isExact: boolean;
  path: string;
  url: string;
}

function provided(value: any) {
    return value !== null && value !== undefined;
}

function rememberLastProps<P>(WrappedComponent: React.ComponentType<P>, propsToRemember: (keyof P)[]) {
    type State = { [K in typeof propsToRemember[number]]?: P[K]; };
    return class extends Component<P, State> {
        constructor(props: P) {
            super(props);
            this.state = {} as State;
        }

        static getDerivedStateFromProps(props: P, state: State) {
            const newState = propsToRemember.reduce(
                    (acc: object, name: keyof P) => {
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
const includeDrafts = window.location.search === '?drafts=true';

function getModel() {
    const windowAsModel = (window as any).model as Model[];
    return windowAsModel && windowAsModel.filter(album => album.draft != true || includeDrafts);
}

function getMapData() {
    return (window as any).mapData as string[][];
}

export class Site extends Component<{}, { ready: boolean, isExact?: boolean }> {
    constructor(props: {}) {
        super(props);

        this.state = { ready: false };
    }

    componentDidMount() {
        this.checkForModelAndMapData.call(this);
    }

    checkForModelAndMapData() {
        if (getModel() && getMapData()) {
            this.setState({ ready: true });
        } else {
            setTimeout(this.checkForModelAndMapData.bind(this), 10);
        }
    }

    render() {
        if (!this.state.ready) return null;

        const AlbumCatalogRouteChildren = ({ match }: { match: Match<AlbumCatalog['props']> }) => {
            return <AlbumCatalog model={ getModel() } focus={ match.isExact }/>;
        };

        const AlbumRouteChildren = ({ match, history }:
                { match: Match<{ title: string, photoIx: string}>, history: History }) => {
            const album = match && getModel().filter(album => album.title === match.params.title)[0];
            const photoIx = match && match.params.photoIx;

            return <CSSTransition in={ match && match.isExact } classNames='container' timeout={ animationTimeout }
                            unmountOnExit >
                        <AlbumThatRemembersAlbum album={ album } history={ history } photoIx={ photoIx }
                            focus={ match && match.isExact && photoIx === undefined} />
                    </CSSTransition>;
        };

        const PhotoRouteChildren = ({ match, history, ...props }:
                { match: Match<{ title: string, photoIx: string }>, history: History }) => {
            const album = match && getModel().filter(album => album.title === match.params.title)[0];
            const photoIx = match && +match.params.photoIx;

            return <CSSTransition in={ match && match.isExact } classNames='container' timeout={ animationTimeout }
                            unmountOnExit >
                        <PhotoThatRemembersAlbumAndPhotoIx album={ album } photoIx={ `${ photoIx }` }
                            history={ history }/>
                    </CSSTransition>;
        };

        const MapRouteChildren = ({ match, history, ...props}:
                { match: Match<{}>, history: History}) => {
            return <CSSTransition in={ match && match.isExact } classNames='container' timeout={ animationTimeout }
                            unmountOnExit >
                        <Map history={ history } data={ getMapData() } />
                    </CSSTransition>;
        };

        return (<HashRouter basename={ homeRoute() }>
                <div className='site'>
                    <Route path={ homeRoute() } children={ AlbumCatalogRouteChildren }/>
                    <Route path={ albumRoute(':title') + '/:dummy?/:photoIx?' } children={ AlbumRouteChildren }/>
                    <Route path={ photoRoute(':title', ':photoIx') } children={ PhotoRouteChildren }/>
                    <Route path={ mapRoute() } children={ MapRouteChildren }/>
                </div>
            </HashRouter>);
    }
}