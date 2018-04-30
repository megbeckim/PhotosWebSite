import React, { Component } from 'react';

export class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    render() {
        const photoIx = this.props.photoIx;
        const picture = this.props.album.chapters[photoIx.chapterIx].pictures[photoIx.photoIx];
        return (
            <div className='photo-container'>
                <img src={`${this.props.album.folder}/${picture.fileName}`} onClick={ this.props.unselectPhoto } />
            </div>
        );
    }
};