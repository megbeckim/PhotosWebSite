import React, { Component } from 'react';
import Headroom from 'react-headroom';
import classNames from 'classnames';

export class Album extends Component {
    constructor(props) {
        super(props);
        this.albumRef = React.createRef();
        this.state = { };
    }

    componentDidMount() {
        this.setState( { albumRefCurrent: this.albumRef.current } );
    }

    componentDidUpdate(prevProps) {
        // TODO this is always true at the moment b/c selectedAlbum is set back to null upon returning to albums
        if ( prevProps.selectedAlbum !== this.props.selectedAlbum ) {
            this.albumRef.current.scrollTop = 0;
        }
    }

    render() {
        return (
            <div className={ classNames('album-container', { open: this.props.selectedAlbum }) }>
                <div className='album' ref={this.albumRef}>
                    <Headroom disable={ !this.state.albumRefCurrent } parent={ () => this.state.albumRefCurrent }>
                        <div style={{ height: "2em" }} onClick={ this.props.onAlbumUnselected }>back</div>
                    </Headroom>
                    <div className='album-wrapper'>
                      <div className='thumbnails'>
                        {
                            this.props.album.chapters.map( (chapter, ix) => {
                                return <div className='chapter' key={ix}>
                                        <div className='chapter-title'>{chapter.title}</div>
                                        {
                                            chapter.pictures.map( (picture, ix2) => {
                                                return  <div key={ix2} className='fp-thumbnail'>
                                                    <img
                                                    src={`http:\/\/faganphotos.com\/album\/2015%20Ethiopia\/pictures\/${picture.fileName}`} />
                                                </div>
                                            })
                                        }
                                    </div>
                            })
                        }
                      </div>
                    </div>
                </div>
            </div>
        );
    }
};