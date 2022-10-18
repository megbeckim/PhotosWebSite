import React, { Component, createRef } from 'react';
import { Model } from '../Types';
import { PriorityImage } from '../PriorityImage';

type Props = { album: string, photo: string, className?: string, priority: number };
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
        const { album, photo, priority, ...passThroughProps } = this.props;

        const dynamicProps = { imageRef: this.thumbnailRef, src: null as string };
        if (this.state.width) {
            dynamicProps.src = `thumb.php5?album=${ encodeURIComponent(album) }&fileName=${ encodeURIComponent(photo) }&width=${this.state.width}`;
        }

        return <PriorityImage priority={ priority } imageRef={this.thumbnailRef} { ...passThroughProps } { ...dynamicProps } />;
    }
};