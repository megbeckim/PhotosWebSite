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
            <span>Fagan</span><span>Photos</span>
        </div>
      </Headroom>
      <AlbumCatalog/>
    </div>,
  document.getElementById('top')
);