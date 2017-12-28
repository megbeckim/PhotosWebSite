import React, { Component } from 'react';
import classNames from 'classnames';

export class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            };
    }

    render() {
        return (
            <div className='site-nav'>
                <div className='branding'>
                    <div>Fagan</div><div>Photos<div>.com</div></div>
                </div>
                <div className='commands'>
                    { this.props.selectedAlbum &&
                        [
                            <div key={1}>{ this.props.selectedAlbum.title }</div>,
                            <div key={2}><a onClick={ this.props.onUnselectAlbum }>return to album list</a></div>
                        ]
                    }
                </div>
            </div>
        );
    }
}