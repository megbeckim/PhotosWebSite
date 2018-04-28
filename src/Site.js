import React, { Component } from 'react';
import { AlbumCatalog } from './albumCatalog/AlbumCatalog';
import { Album } from './album/Album';

export class Site extends Component {
    constructor( props ) {
        super( props );

        this.state = { };

        fetch('https://script.google.com/macros/s/AKfycbxtkKbLArbu1ehXE-Rv-is5EGlwDFejP5rBYluB/exec')
            .then( response => response.json() )
            .then( model => this.setState( { model } ) );
    }

    selectAlbum(album) {
        this.setState( { selectedAlbum: album } );
    }

    unselectAlbum() {
        this.setState( { selectedAlbum: null } );
    }

    render() {
        // TODO the drop shadow is _just_ visible when the headers scroll away, which means the top of the picture is never 100% clear
        return (
            <div className='site'>
                <AlbumCatalog model={ this.state.model }
                    onAlbumSelected={ this.selectAlbum.bind( this ) } />
                { this.state.selectedAlbum && <Album album={ this.state.selectedAlbum }
                    onAlbumUnselected={ this.unselectAlbum.bind( this ) } /> }
            </div>
        );
    }
}