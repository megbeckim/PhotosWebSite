import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl, CarouselCaption } from 'reactstrap';
import classNames from 'classnames';

export class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = { controlsShown: true };
    }

    previous() {
        if (this.props.photoIx !== 0) {
            this.props.selectPhotoIx(this.props.photoIx - 1);
            this.showControls();
        }
    }

    next() {
        const numberOfPictures = this.props.album.chapters.reduce((acc, chapter) => acc + chapter.pictures.length, 0);
        if (this.props.photoIx !== numberOfPictures-1) {
            this.props.selectPhotoIx(this.props.photoIx + 1);
            this.showControls();
        }
    }

    close() {
        this.props.selectPhotoIx(null);
    }

    showControls() {
        this.setState({ controlsShown: true });
        this.resetTimer();
    }

    resetTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => this.setState({ controlsShown: false }), 3000);
    }

    componentDidMount() {
        this.resetTimer();
    }

    render() {
        const pictures = this.props.album.chapters.reduce((acc, chapter) => acc.concat(chapter.pictures), []);
        const picture = pictures[this.props.photoIx];
        return (
            <div className={ classNames('photo-container', { 'show-controls': this.state.controlsShown }) } onClick={ this.showControls.bind(this) } >
                <Carousel activeIndex={ this.props.photoIx }
                        interval={ false }
                        next={ this.next.bind(this) } previous={ this.previous.bind(this) }>
                    {
                        pictures.map( (picture, ix) =>
                            <CarouselItem key={ ix }>
                                <img className='background' src={`${this.props.album.folder}/${picture.fileName}`} />
                                <img className='photo' src={`${this.props.album.folder}/${picture.fileName}`} />
                                <CarouselCaption className='caption' captionText={ picture.caption } />
                            </CarouselItem>
                        )
                    }
                </Carousel>
                <div className='close' onClick={ this.close.bind(this) } >X</div>
                <div className={ classNames('prev', { disabled: this.props.photoIx === 0 }) } onClick={ this.previous.bind(this) }>&larr;</div>
                <div className={ classNames('next', { disabled: this.props.photoIx === pictures.length-1 }) } onClick={ this.next.bind(this) }>&rarr;</div>
            </div>
          );
    }
};