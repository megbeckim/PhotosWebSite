import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router-dom'
import { homeRoute, photoRoute } from '../routes';

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
                            <Link to={ homeRoute() }><div>&larr;</div></Link>
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
                                                    <Link to={ photoRoute(this.props.album.title, thisIndex) }>
                                                        <img src={`${this.props.album.folder}/${picture.fileName}`}/>
                                                    </Link>
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