import React, { Component } from 'react';
import { AlbumCatalog } from './albumCatalog/AlbumCatalog';
import { Album } from './album/Album';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const animationTimeout = 500;

export class Site extends Component {
    constructor(props) {
        super(props);

        this.state = { };

        fetch('https://script.google.com/macros/s/AKfycbxtkKbLArbu1ehXE-Rv-is5EGlwDFejP5rBYluB/exec')
            .then(response => response.json())
            .then(model => this.setState({ model }));
    }

    selectAlbum(album) {
        this.setState({ selectedAlbum: album });
    }

    render() {
        return (
            <TransitionGroup className='site'>
                <AlbumCatalog model={ this.state.model }
                    onAlbumSelected={ this.selectAlbum.bind(this) } />
                { this.state.selectedAlbum &&
                    <CSSTransition key='album' classNames='container' timeout={ animationTimeout } >
                        <Album album={ this.state.selectedAlbum } onAlbumUnselected={ this.selectAlbum.bind(this, null) } />
                    </CSSTransition>
                }
            </TransitionGroup>
        );
    }
}