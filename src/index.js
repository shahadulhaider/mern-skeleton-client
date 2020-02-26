import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Layout from './layout';
import MainRouter from './routes';
import store from './store';

import './theme/styles/bootstrap-grid.min.css';

function Main() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <MainRouter />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));
