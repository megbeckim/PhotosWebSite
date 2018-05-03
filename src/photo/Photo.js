import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselCaption } from 'reactstrap';

export class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    previous(e) {
        if (this.props.photoIx !== 0) {
            this.props.selectPhotoIx(this.props.photoIx - 1);
        }
    }

    next(e) {
        const numberOfPictures = this.props.album.chapters.reduce((acc, chapter) => acc + chapter.pictures.length, 0);
        if (this.props.photoIx !== numberOfPictures-1) {
            this.props.selectPhotoIx(this.props.photoIx + 1);
        }
    }

    close(e) {
        this.props.selectPhotoIx(null);
    }

    render() {
        const pictures = this.props.album.chapters.reduce((acc, chapter) => acc.concat(chapter.pictures), []);
        const picture = pictures[this.props.photoIx];
        return (
            <div className='photo-container'>
                <Carousel activeIndex={ this.props.photoIx }
                        interval={ false }
                        next={ this.next.bind(this) } previous={ this.previous.bind(this) }>
                    {
                        pictures.map( (picture, ix) =>
                            <CarouselItem key={ ix }>
                                <img className='background' src={`${this.props.album.folder}/${picture.fileName}`} onClick={ this.close.bind(this) } />
                                <img className='photo' src={`${this.props.album.folder}/${picture.fileName}`} onClick={ this.close.bind(this) } />
                                { ix != 0 && <CarouselControl direction='prev' onClickHandler={ this.previous.bind(this) } /> }
                                { ix != pictures.length-1 && <CarouselControl direction='next' onClickHandler={ this.next.bind(this) } /> }
                                <CarouselCaption className='caption' captionText={ picture.caption } />
                            </CarouselItem>
                        )
                    }
                 </Carousel>
            </div>
          );
    }
};