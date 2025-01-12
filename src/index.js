import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import myChart from './problem/problem4';

const root = ReactDOM.createRoot(document.getElementById('myChart'));
root.render(
  <React.StrictMode>
    <myChart />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
