import React, { Component } from 'react';
import { AlbumCatalog } from './albumCatalog/AlbumCatalog';
import { Album } from './album/Album';

import album from './data/album1.js';
import model from './data/model.js';

export class Site extends Component {
    constructor( props ) {
        super( props );
        this.state = { };
    }

    selectAlbum(album) {
        // TODO get a real album from somewhere!
        this.setState( { selectedAlbum: album } );
    }

    unselectAlbum() {
        this.setState( { selectedAlbum: null } );
    }

    render() {
        return (
            <div className='site'>
                <AlbumCatalog selectedAlbum={ this.state.selectedAlbum }
                    model={ model }
                    onAlbumSelected={ this.selectAlbum.bind( this ) } />
                <Album selectedAlbum={ this.state.selectedAlbum }
                    album={ album }
                    onAlbumUnselected={ this.unselectAlbum.bind( this ) } />
            </div>
        );
    }
}