import '../css/main.css';
import React from 'react';
import { render } from 'react-dom';
import App from './App';

const container = document.querySelector('#application');

render(<App />, container);