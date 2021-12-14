import React, { Component, createRef } from 'react';
import { Model } from '../Types';

type Props = { album: string, photo: string, className?: string };
type State = { width?: number };

export class Thumbnail extends Component<Props, State> {
    private thumbnailRef = createRef<HTMLImageElement>();

    constructor(props: Props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        const thumbnailRefCurrent = this.thumbnailRef.current;
        const width = thumbnailRefCurrent.clientWidth;
        this.setState( { width } );
    }

    render() {
        const { album, photo, ...passThroughProps } = this.props;

        const dynamicProps = { ref: this.thumbnailRef, src: null as string };
        if (this.state.width) {
            dynamicProps.src = `thumb.php5?album=${ encodeURIComponent(album) }&fileName=${ encodeURIComponent(photo) }&width=${this.state.width}`;
        }

        return <img { ...passThroughProps } { ...dynamicProps } />;
    }
};