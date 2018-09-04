import React, { Component } from 'react';
import { Carousel, CarouselItem, CarouselControl } from 'reactstrap';
import Swipeable from 'react-swipeable'
import classNames from 'classnames';
import { albumRoute, photoRoute } from '../routes';

const ESCAPE_KEY_CODE = 27;

export class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = { controlsShown: true };
        this.ref = React.createRef();
    }

    previous() {
        if (this.props.photoIx !== 0) {
            this.props.history.replace(photoRoute(this.props.album.title, this.props.photoIx - 1));
            this.showControls();
        }
    }

    next() {
        const numberOfPictures = this.props.album.chapters.reduce((acc, chapter) => acc + chapter.pictures.length, 0);
        if (this.props.photoIx !== numberOfPictures-1) {
            this.props.history.replace(photoRoute(this.props.album.title, this.props.photoIx + 1));
            this.showControls();
        }
    }

    close() {
        this.props.history.goBack();
    }

    showControls() {
        this.setState({ controlsShown: true });
        this.setTimer();
    }

    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    setTimer() {
        this.clearTimer();
        this.timer = setTimeout(() => this.setState({ controlsShown: false }), 3000);
    }

    componentDidMount() {
        this.setTimer();
        this.ref.current.focus();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        const pictures = this.props.album.chapters.reduce((acc, chapter) => acc.concat(chapter.pictures), []);
        const picture = pictures[this.props.photoIx];
        return (
            <div ref={this.ref} className={ classNames('photo-container', { 'show-controls': this.state.controlsShown }) }
                    onClick={ this.showControls.bind(this) }
                    onMouseMove={ this.showControls.bind(this) }
                    onKeyUp={ e => { if(e.keyCode === ESCAPE_KEY_CODE) this.close(); } }
                    tabIndex='0'>
                <Swipeable onSwipedLeft={ this.next.bind(this) } onSwipedRight={ this.previous.bind(this) } className='photo-container'>
                    <Carousel activeIndex={ this.props.photoIx }
                            interval={ false }
                            next={ this.next.bind(this) } previous={ this.previous.bind(this) }>
                        {
                            pictures.map( (picture, ix) =>
                                <CarouselItem key={ ix }>
                                    {
                                        picture.fileName.endsWith('.mp4')
                                            ? <video className='photo' controls={ true } src={ `${this.props.album.folder}/${picture.fileName}` } />
                                            : <img className='photo' src={ `${this.props.album.folder}/${picture.fileName}` } />
                                    }
                                    <div className='caption' >{ picture.caption }</div>
                                </CarouselItem>
                            )
                        }
                    </Carousel>
                    <div className='close' onClick={ this.close.bind(this) } ><img className='fas fa-images'/></div>
                    <div className={ classNames('prev', { disabled: this.props.photoIx === 0 }) } onClick={ this.previous.bind(this) }><img className='fas fa-angle-left' /></div>
                    <div className={ classNames('next', { disabled: this.props.photoIx === pictures.length-1 }) } onClick={ this.next.bind(this) }><img className='fas fa-angle-right' /></div>
                </Swipeable>
            </div>
          );
    }
};