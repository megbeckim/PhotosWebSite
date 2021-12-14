import React from 'react';
import { render } from 'react-dom';
import { Site } from './site/Site';
import recreateHistory from './recreateHistory';

import './index.scss';

recreateHistory();

render(<Site/>, document.getElementById('top'));