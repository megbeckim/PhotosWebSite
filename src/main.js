import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Headroom from 'react-headroom';
//import { Site } from './Site';
import { AlbumCatalog } from './AlbumCatalog';

import './main.scss';

ReactDOM.render(
    <div>
      <Headroom>
        <div className='site-nav'>
            <div className='branding'>
                <div>Fagan</div><div>Photos<div>.com</div></div>
            </div>
            <div>search</div>
        </div>
      </Headroom>
      <AlbumCatalog/>
    </div>,
  document.getElementById('top')
);