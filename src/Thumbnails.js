import React, { Component } from 'react';
import createColor from './colours.js';

export class Thumbnails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            };
    }

    render() {
        return (
              <div className='thumbnails'>
                {
                    this.props.album.chapters.map( (chapter, ix) => {
                        return <div className='chapter' key={ix}>
                                <div className='chapter-title' style={{'backgroundColor': createColor(ix)}}>{chapter.title}</div>
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
        );
    }
};