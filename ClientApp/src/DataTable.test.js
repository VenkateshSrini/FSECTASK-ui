import React from 'react';
import ReactDOM from 'react-dom';

import DataTable from './components/DataTable';
it('renders without crashing', async () => {
    const div = document.createElement('div');
    ReactDOM.render(
      
        <DataTable />
      , div);
    await new Promise(resolve => setTimeout(resolve, 1000));
  });