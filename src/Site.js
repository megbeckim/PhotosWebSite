import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { Menu } from './Menu';
import { AlbumCatalog } from './AlbumCatalog';
import { Thumbnails } from './Thumbnails';
import classNames from 'classnames';

import album from './album1.js';

export class Site extends Component {
    constructor(props) {
        super(props);
        this.albumCatalogRef = React.createRef();
        this.albumRef = React.createRef();
        this.state = {
            };
    }

    selectAlbum(album) {
        this.setState({selectedAlbum: album});
    }

    unselectAlbum() {
        this.setState({selectedAlbum: null});
    }

    componentDidMount() {
        this.setState( { albumCatalogRef: this.albumCatalogRef.current, albumRef: this.albumRef.current } );
    }

    componentDidUpdate(prevProps, prevState) {
        // TODO this is always true at the moment b/c selectedAlbum is set back to null upon returning to albums
        if ( prevState.selectedAlbum !== this.state.selectedAlbum ) {
            this.albumRef.current.scrollTop = 0;
        }
    }

    render() {
        return (
            <div className='site'>
                <div className={ classNames('album-catalog-container', { open: !this.state.selectedAlbum }) }>
                    <div className='album-catalog' ref={this.albumCatalogRef}>
                        <Headroom disable={ !this.state.albumCatalogRef } parent={ () => this.albumCatalogRef.current }>
                            <Menu selectedAlbum={ this.state.selectedAlbum } onUnselectAlbum={ this.unselectAlbum.bind(this) }/>
                        </Headroom>
                        <div className='album-catalog-wrapper'>
                            <AlbumCatalog onAlbumSelected={ this.selectAlbum.bind(this) }/>
                        </div>
                    </div>
                </div>
                <div className={ classNames('album-container', { open: this.state.selectedAlbum }) }>
                    <div className='album' ref={this.albumRef}>
                        <Headroom disable={ !this.state.albumRef } parent={ () => this.albumRef.current }>
                            <div style={{ height: "2em" }} onClick={ this.unselectAlbum.bind(this) }>back</div>
                        </Headroom>
                        <div className='album-wrapper'>
                            <Thumbnails album={album}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}