import React from 'react';
import {render} from 'react-dom'
import { Provider } from 'react-redux';
import App from './Containers/App';
import { store } from './redux/store';

render(<Provider store={store}><App /></Provider>, document.getElementById("root"))