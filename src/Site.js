import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { AlbumCatalog } from './AlbumCatalog';
import { Thumbnails } from './Thumbnails';
import classNames from 'classnames';

import album from './album1.js';

export class Site extends Component {
    constructor(props) {
        super(props);
        this.state = {
            };
    }

    selectAlbum(album) {
        this.setState({selectedAlbum: album});
    }

    render() {
        return (
            <div className='site'>
                <Headroom>
                <div className='site-nav'>
                    <div className='branding'>
                        <div>Fagan</div><div>Photos<div>.com</div></div>
                    </div>
                    <div>search</div>
                </div>
                </Headroom>
                <div className={ classNames('album-catalog-container', { open: !this.state.selectedAlbum }) }>
                    <AlbumCatalog onAlbumSelected={ this.selectAlbum.bind(this) }/>
                </div>
                <div className={ classNames('thumbnails-container', { open: this.state.selectedAlbum }) }>
                    <Thumbnails album={album}/>
                </div>
            </div>
        );
    }
}