import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {legacyLogicalPropertiesTransformer, StyleProvider } from '@ant-design/cssinjs';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';

import {setupStore} from "./store"
import App from './App';

import './index.scss';

const store = setupStore()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyleProvider layer transformers={[legacyLogicalPropertiesTransformer]} hashPriority="high">
        <ConfigProvider locale={ruRU} theme={{ cssVar: true, hashed: false }}>
          <App />
        </ConfigProvider>
      </StyleProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
