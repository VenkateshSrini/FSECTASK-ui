import React from 'react';
import ReactDOM from 'react-dom';

import Home from './components/Home';

it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      
        <Home />
      , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
  });