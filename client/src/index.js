import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import {
  faUserCircle,
  faGraduationCap
} from '@fortawesome/fontawesome-free-solid';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

fontawesome.library.add(brands, faUserCircle, faGraduationCap);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
