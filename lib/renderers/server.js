import React from 'react';
import ReactDOMServer from 'react-dom/server';
import axios from 'axios';
import DataApi from 'state-api/DataApi';
import App from 'components/App';
import { host, port } from 'config';

const serverRender = async () => {
  const res = await axios.get(`http://${host}:${port}/data`);
  const api = new DataApi(res.data);
  const initialData = {
    articles: api.getArticles(),
    authors: api.getAuthors()
  };
  return {
    initialMarkup: ReactDOMServer.renderToString(
      <App initialData={initialData} />
    ),
    initialData
  };
};

export default serverRender;
