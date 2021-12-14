import React, { Component, createRef } from 'react';
import { Carousel } from 'react-bootstrap';
import classNames from 'classnames';
import { albumRoute, photoRoute } from '../routes';
import { Model, Chapter, Picture } from '../Types';
import { History } from 'history';

const ESCAPE_KEY_CODE = 27;

type Props = { history: History, album: Model, photoIx: string };
type State = { controlsShown: boolean };

type CarouselRef = {
    element?: HTMLElement;
    prev: (e?: React.SyntheticEvent) => void;
    next: (e?: React.SyntheticEvent) => void;
};

export class Photo extends Component<Props, State> {
    private ref = createRef<CarouselRef>();
    private videoRef = createRef<HTMLVideoElement>();
    private timer: number;

    constructor(props: Props) {
        super(props);
        this.state = { controlsShown: true };
    }

    select(index: string) {
        if (this.videoRef.current && this.videoRef.current.pause) {
            this.videoRef.current.pause();
        }
        this.props.history.replace(photoRoute(this.props.album.title, index));
        this.showControls();
        this.ref.current.element.focus();
    }

    previous() {
        if (this.props.photoIx !== '0') {
            this.select(`${ +this.props.photoIx - 1 }`);
        }
    }

    next() {
        const numberOfPictures = this.props.album.chapters.reduce((acc: number, chapter: Chapter) => acc + chapter.pictures.length, 0);
        if (+this.props.photoIx !== numberOfPictures - 1) {
            this.select(`${ +this.props.photoIx + 1 }`);
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
            window.clearTimeout(this.timer);
        }
    }

    setTimer() {
        this.clearTimer();
        this.timer = window.setTimeout(() => this.setState({ controlsShown: false }), 3000);
    }

    componentDidMount() {
        // could this simply be a call to select("0")?
        this.setTimer();
        this.ref.current.element.focus();
    }

    componentWillUnmount() {
        this.clearTimer();
    }

    render() {
        const pictures = this.props.album.chapters
            .reduce((acc: Picture[], chapter: Chapter) => acc.concat(chapter.pictures), []);
        const picture = pictures[+this.props.photoIx];
        return (
            <div className={ classNames('photo-container', { 'show-controls': this.state.controlsShown }) }
                    onClick={ this.showControls.bind(this) }
                    onMouseMove={ this.showControls.bind(this) }
                    onKeyUp={ e => { if(e.keyCode === ESCAPE_KEY_CODE) this.close(); } }
                    >
                <Carousel activeIndex={ +this.props.photoIx }
                        ref={this.ref}
                        tabIndex={ -1 }
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
                                        ? <video className='photo' controls={ true }
                                            ref={ +this.props.photoIx === ix ? this.videoRef : null }
                                            src={ `${this.props.album.folder}/${picture.fileName}` } />
                                        : <img className='photo'
                                            src={ `${this.props.album.folder}/${picture.fileName}` } />
                                }
                                <div className='caption' >{ picture.caption }</div>
                            </Carousel.Item>
                        )
                    }
                </Carousel>
                <div className='close' onClick={ this.close.bind(this) } ><img className='fas fa-images'/></div>
                <div className={ classNames('prev', { disabled: +this.props.photoIx === 0 }) } onClick={ this.previous.bind(this) }><img className='fas fa-angle-left' /></div>
                <div className={ classNames('next', { disabled: +this.props.photoIx === pictures.length-1 }) } onClick={ this.next.bind(this) }><img className='fas fa-angle-right' /></div>
            </div>
          );
    }
};