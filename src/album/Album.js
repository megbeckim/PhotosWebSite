import React, { Component } from 'react';
import Headroom from 'react-headroom';

export class Album extends Component {
    constructor(props) {
        super(props);
        this.albumRef = React.createRef();
        this.state = { };
    }

    componentDidMount() {
        this.setState( { albumRefCurrent: this.albumRef.current } );
    }

    render() {
        var index = 0;
        return (
            <div className='album-container'>
                <div className='album' ref={this.albumRef}>
                    <Headroom disable={ !this.state.albumRefCurrent } parent={ () => this.state.albumRefCurrent }>
                        <div className='header'>
                            <div>{this.props.album.title}</div>
                            <div onClick={ this.props.onAlbumUnselected }>&larr;</div>
                        </div>
                    </Headroom>
                    <div className='album-wrapper'>
                      <div className='thumbnails'>
                        {
                            this.props.album.chapters.map( (chapter, chapterIx) => {
                                return <div key={chapterIx} className='chapter' key={chapterIx}>
                                        <div className='chapter-title'>{chapter.title}</div>
                                        {
                                            chapter.pictures.map( (picture, photoIx) => {
                                                const thisIndex = index++;
                                                return  <div key={photoIx} className='fp-thumbnail'>
                                                    <img
                                                    src={`${this.props.album.folder}/${picture.fileName}`}
                                                        onClick={ () => this.props.selectPhotoIx(thisIndex) }/>
                                                </div>;
                                            })
                                        }
                                    </div>;
                            })
                        }
                      </div>
                    </div>
                </div>
            </div>
        );
    }
};