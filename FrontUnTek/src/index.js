import React from 'react';
import ReactDOM from 'react-dom';
import './Css/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import common_en from "./Translations/en/common.json"
import common_fr from "./Translations/fr/common.json"
import i18next from 'i18next';
import './i18n';
import Popup from 'react-popup';

i18next.init({
  interpolation: {escapeValue: false},
  lng: 'fr',
  resources: {
    en: {
      common: common_en
    },
    fr: {
      common: common_fr
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
      <Popup />
      <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
