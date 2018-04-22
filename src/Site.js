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
        this.myRef = React.createRef();
        this.myRef2 = React.createRef();
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
        this.setState( { myRef: this.myRef.current, myRef2: this.myRef2.current } );
    }

    componentDidUpdate(prevProps, prevState) {
        // TODO this is always true at the moment b/c selectedAlbum is set back to null upon returning to albums
        if ( prevState.selectedAlbum !== this.state.selectedAlbum ) {
            this.myRef2.current.scrollTop = 0;
        }
    }

    render() {
        return (
            <div className='site'>
                <div className={ classNames('album-selector', { open: !this.state.selectedAlbum }) }>
                    <div className='album-selector-container' ref={this.myRef}>
                        <Headroom disable={ !this.state.myRef } parent={ () => this.myRef.current }>
                            <Menu selectedAlbum={ this.state.selectedAlbum } onUnselectAlbum={ this.unselectAlbum.bind(this) }/>
                        </Headroom>
                        <div className='album-catalog-container'>
                            <AlbumCatalog onAlbumSelected={ this.selectAlbum.bind(this) }/>
                        </div>
                    </div>
                </div>
                <div className={ classNames('photo-selector', { open: this.state.selectedAlbum }) }>
                    <div className='photo-selector-container' ref={this.myRef2}>
                        <Headroom disable={ !this.state.myRef2 } parent={ () => this.myRef2.current }>
                            <div style={{ height: "2em" }} onClick={ this.unselectAlbum.bind(this) }>back</div>
                        </Headroom>
                        <div className='thumbnails-container'>
                            <Thumbnails album={album}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}