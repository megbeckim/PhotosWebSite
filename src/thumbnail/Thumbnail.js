import React, { Component } from 'react';

export class Thumbnail extends Component {
    constructor(props) {
        super(props);
        this.thumbnailRef = React.createRef();
        this.state = { };
    }

    componentDidMount() {
        const thumbnailRefCurrent = this.thumbnailRef.current;
        const width = thumbnailRefCurrent.clientWidth;
        this.setState( { width } );
    }

    render() {
        const { component, album, photo, ...passThroughProps } = this.props;

        const dynamicProps = { ref: this.thumbnailRef };
        if (this.state.width) {
            dynamicProps.src = `thumb.php5?album=${ encodeURIComponent(album) }&fileName=${ encodeURIComponent(photo) }&width=${this.state.width}`;
        }

        return React.cloneElement(component, { ...passThroughProps, ...dynamicProps } );
    }
};