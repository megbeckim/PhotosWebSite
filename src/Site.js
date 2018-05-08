import React, { Component } from 'react';
import { AlbumCatalog } from './albumCatalog/AlbumCatalog';
import { Album } from './album/Album';
import { Photo } from './photo/Photo';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { HashRouter, Route } from 'react-router-dom'

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
                    { album && <CSSTransition key='album' classNames='container' timeout={ animationTimeout }>
                        <Album album={ album }/>
                    </CSSTransition> }
                </TransitionGroup>);
        };

        const PhotoRoute = ({ match, history, ...props}) => {
            const album = match && this.state.model.filter(album => album.title === match.params.title)[0];

            return (<TransitionGroup>
                    { album && <CSSTransition key='photo' classNames='container' timeout={ animationTimeout }>
                        <Photo album={ album } photoIx={ +match.params.photoIx } history={ history }/>
                    </CSSTransition> }
                </TransitionGroup>);
        };

        return (<HashRouter basename='/'>
                <div className='site'>
                    <AlbumCatalog model={ this.state.model }/>
                    <Route path='/album/:title' children={ AlbumRoute }/>
                    <Route path='/album/:title/photo/:photoIx' children={ PhotoRoute }/>
                </div>
            </HashRouter>);
    }
}