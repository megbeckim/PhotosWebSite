import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem, Dropdown } from 'react-bootstrap';
import { AlbumCarousel } from './AlbumCarousel';
import classNames from 'classnames';

import model from './model.js';

export class Site extends Component {
    constructor(props) {
        super(props);
        this.state = { showControls: false };
    }

    showControls() {
        if (this.state.timeoutId) {
            clearTimeout(this.state.timeoutId);
        }
        this.setState({ showControls: true });
        const timeoutId = setTimeout( () => this.setState({ showControls: false }), 2000);
        this.setState({ timeoutId });
    }

    render() {
        return (
            <div className='main'>
                <img src={model[0].coverImage}
                    onClick={ this.showControls.bind(this) }
                    onMouseMove={ this.showControls.bind(this) }
                />
                <div className={classNames('title', { visible: this.state.showControls })}>{model[0].title}</div>
            </div>
        );
    }
};