import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames';
import { albumRoute, photoRoute } from '../routes';

const ESCAPE_KEY_CODE = 27;

export class Photo extends Component {
    constructor(props) {
        super(props);
        this.state = { controlsShown: true };
        this.ref = React.createRef();
    }

    select(index) {
        this.props.history.replace(photoRoute(this.props.album.title, index));
        this.showControls();
    }

    previous() {
        if (this.props.photoIx !== 0) {
            this.select(this.props.photoIx - 1);
        }
    }

    next() {
        const numberOfPictures = this.props.album.chapters.reduce((acc, chapter) => acc + chapter.pictures.length, 0);
        if (this.props.photoIx !== numberOfPictures-1) {
            this.select(this.props.photoIx + 1);
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
        this.ref.current.element.focus();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        const pictures = this.props.album.chapters.reduce((acc, chapter) => acc.concat(chapter.pictures), []);
        const picture = pictures[this.props.photoIx];
        return (
            <div className={ classNames('photo-container', { 'show-controls': this.state.controlsShown }) }
                    onClick={ this.showControls.bind(this) }
                    onMouseMove={ this.showControls.bind(this) }
                    onKeyUp={ e => { if(e.keyCode === ESCAPE_KEY_CODE) this.close(); } }
                    >
                <Carousel activeIndex={ this.props.photoIx }
                        ref={this.ref}
                        tabIndex="-1"
                        controls={ false }
                        indicators={ false }
                        wrap={ false }
                        interval={ null }
                        onSelect={ this.select.bind(this) }
                        >
                    {
                        pictures.map( (picture, ix) =>
                            <Carousel.Item key={ ix }>
                                {
                                    picture.fileName.endsWith('.mp4')
                                        ? <video className='photo' controls={ true } src={ `${this.props.album.folder}/${picture.fileName}` } />
                                        : <img className='photo' src={ `${this.props.album.folder}/${picture.fileName}` } />
                                }
                                <div className='caption' >{ picture.caption }</div>
                            </Carousel.Item>
                        )
                    }
                </Carousel>
                <div className='close' onClick={ this.close.bind(this) } ><img className='fas fa-images'/></div>
                <div className={ classNames('prev', { disabled: this.props.photoIx === 0 }) } onClick={ this.previous.bind(this) }><img className='fas fa-angle-left' /></div>
                <div className={ classNames('next', { disabled: this.props.photoIx === pictures.length-1 }) } onClick={ this.next.bind(this) }><img className='fas fa-angle-right' /></div>
            </div>
          );
    }
};