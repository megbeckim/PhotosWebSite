import React, { Component } from 'react';
import Headroom from 'react-headroom';
import { Link } from 'react-router-dom'
import { homeRoute, photoRoute } from '../routes';
import { Thumbnail } from '../thumbnail/Thumbnail';

const img = <img/>;
const video = <video/>;

const ESCAPE_KEY_CODE = 27;

function isElementEntirelyVisible (el) {
    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

export class Album extends Component {
    constructor(props) {
        super(props);
        this.albumRef = React.createRef();
        this.visiblePhotoRef = React.createRef();
        this.state = {};
    }

    close() {
        this.props.history.goBack();
    }

    componentDidMount() {
        this.setState( { albumRefCurrent: this.albumRef.current } );
        this.albumRef.current.focus();
    }

    componentDidUpdate() {
        if(!this.props.photoIx
                && this.state.mostRecentPhotoViewed
                && !isElementEntirelyVisible(this.visiblePhotoRef.current)) {
            // was the user was viewing backward
            const backward = this.state.secondMostRecentPhotoViewed
                && Number(this.state.secondMostRecentPhotoViewed) > Number(this.state.mostRecentPhotoViewed);
            this.visiblePhotoRef.current.scrollIntoView(backward);
        }
        if(this.props.focus) {
            this.albumRef.current.focus();
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
                <div className='album' ref={this.albumRef}
                        onKeyUp={ e => { if(e.keyCode === ESCAPE_KEY_CODE) this.close(); } }
                        tabIndex='0'>
                    <Headroom disable={ !this.state.albumRefCurrent } parent={ () => this.state.albumRefCurrent }>
                        <div className='header'>
                            <div>{this.props.album.title}</div>
                            <div className='home' onClick={ this.close.bind(this) } ><img className='fas fa-home'/></div>
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