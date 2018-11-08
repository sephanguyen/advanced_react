import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import StateApi from 'state-api/StateApi';
import App from 'components/App';
import { host, port } from 'config';

const serverRender = async () => {
  const res = await axios.get(`http://${host}:${port}/data`);
  const store = new StateApi(res.data);
  return {
    initialMarkup: ReactDOMServer.renderToString(<App store={store} />),
    initialData: res.data
  };
};

export default serverRender;
