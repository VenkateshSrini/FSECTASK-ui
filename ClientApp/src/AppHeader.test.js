import React from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './components/AppHeader';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      
        <AppHeader />
      , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
  });