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
                            <Link to={ homeRoute() }><div className='home'><img className='fas fa-home'/></div></Link>
                        </div>
                    </Headroom>
                    <div className='album-wrapper'>
                      <div className='thumbnails'>
                        {
                            this.props.album.chapters.map( (chapter, chapterIx) =>
                                    chapter.pictures.map( (picture, photoIx) => {
                                           const thisIndex = index++;
                                           return  <div key={`${chapterIx}-${photoIx}`} className='fp-thumbnail'>
                                               <Link to={ photoRoute(this.props.album.title, thisIndex) }>
                                                   <img src={`${this.props.album.folder}/${picture.fileName}`}/>
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