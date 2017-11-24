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
                <div>search</div>
            </div>
        );
    }
}