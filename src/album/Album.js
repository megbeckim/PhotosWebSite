import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router-dom'
import { homeRoute, photoRoute } from '../routes';
import { matchPath } from 'react-router'
import { Thumbnail } from '../thumbnail/Thumbnail';

const img = <img/>;
const video = <video/>;

export class Album extends Component {
    constructor(props) {
        super(props);
        this.albumRef = React.createRef();
        this.visiblePhotoRef = React.createRef();
        this.state = {};
    }

    componentDidMount() {
        this.setState( { albumRefCurrent: this.albumRef.current } );
    }

    componentDidUpdate() {
        if(!this.props.photoIx && this.state.mostRecentPhotoViewed) {
            // was the user was viewing backward
            const backward = this.state.secondMostRecentPhotoViewed
                && Number(this.state.secondMostRecentPhotoViewed) > Number(this.state.mostRecentPhotoViewed);
            this.visiblePhotoRef.current.scrollIntoView(backward);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.photoIx) {
            return { mostRecentPhotoViewed: props.photoIx, secondMostRecentPhotoViewed: state.mostRecentPhotoViewed };
        } else {
            return null;
        }
    }

    render() {
        var index = 0;
        return (
            <div className='album-container'>
                <div className='album' ref={this.albumRef}>
                    <Headroom disable={ !this.state.albumRefCurrent } parent={ () => this.state.albumRefCurrent }>
                        <div className='header'>
                            <div>{this.props.album.title}</div>
                            <Link to={ homeRoute() }><div className='home'><img className='fas fa-home'/></div></Link>
                        </div>
                    </Headroom>
                    <div className='album-wrapper'>
                      <div className='thumbnails'>
                        {
                            this.props.album.chapters.map( (chapter, chapterIx) =>
                                    chapter.pictures.map( (picture, photoIx) => {
                                           const thisIndex = index++;
                                           const folder = this.props.album.folder.substring('albums/'.length);

                                           return  <div key={`${chapterIx}-${photoIx}`} className='fp-thumbnail'
                                                ref={ thisIndex == this.state.mostRecentPhotoViewed ? this.visiblePhotoRef : null }>
                                               <Link to={ photoRoute(this.props.album.title, thisIndex) }>
                                                   {
                                                       picture.fileName.endsWith('.mp4')
                                                           ? <Thumbnail component={ video } className='photo' controls={ false } src={ () => `${this.props.album.folder}/${picture.fileName}` } />
                                                           : <Thumbnail component={ img } className='photo' src={ width => `thumb.php5?album=${folder}&fileName=${picture.fileName}&width=${width}` } />
                                                   }
                                                   { photoIx===0 && <div key={chapterIx} className='chapter-title'>{chapter.title}</div> }
                                               </Link>
                                           </div>;
                                       })
                                )
                        }
                      </div>
                    </div>
                </div>
            </div>
        );
    }
};