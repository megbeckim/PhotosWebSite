import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

export class AlbumCarousel extends Component {
    constructor(props) {
        super(props);
        this.state = {
                direction: null
            };
    }

    handleSelect(selectedIndex, e) {
        this.setState({
                direction: e.direction
            }
        );

        this.props.handleSelectAlbum(selectedIndex);
    }

    render() {
        return (
              <Carousel className='album-carousel'
                activeIndex={this.props.selectedIndex}
                direction={this.state.direction}
                onSelect={this.handleSelect.bind(this)}
                interval={0} >
                {
                    this.props.model.map( (album, ix) =>
                        <Carousel.Item key={ix} >
                          <img width={900} height={500} src={album.coverImage} />
                          <Carousel.Caption>
                            <h2>Touch or Click to view the album</h2>
                            <h1>{album.title}</h1>
                          </Carousel.Caption>
                        </Carousel.Item>
                    )
                }
              </Carousel>
        );
    }
};