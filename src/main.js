import React from 'react';
import ReactDOM from 'react-dom';
import { Site } from './site/Site';
import recreateHistory from './recreateHistory';

import './main.scss';

recreateHistory();

ReactDOM.render(<Site/>, document.getElementById('top'));