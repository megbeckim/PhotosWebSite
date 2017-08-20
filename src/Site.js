import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import { AlbumCarousel } from './AlbumCarousel';

import model from './model.js';

export class Site extends Component {
    constructor(props) {
        super(props);
        this.state = {
                selectedAlbumIndex: 0,
            };
    }

    handleSelectAlbum(selectedAlbumIndex) {
        this.setState({
                selectedAlbumIndex: selectedAlbumIndex,
            }
        );
    }

    render() {
        return (
            <div className='main'>
                <AlbumCarousel model={model} handleSelectAlbum={this.handleSelectAlbum.bind(this)} selectedIndex={this.state.selectedAlbumIndex}/>

                <Dropdown bsStyle='main-menu' id='dropdown-no-caret'>
                    <Dropdown.Toggle noCaret>
                        <i className='fa fa-bars' aria-hidden='true'></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        { model.map( (album, ix) => <MenuItem key={ix} eventKey={ix} onSelect={ () => this.handleSelectAlbum(ix) }>{album.title}</MenuItem> ) }
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    }
};