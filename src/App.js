import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import { ThemeProvider, StylesProvider, jssPreset } from '@material-ui/styles';
import rtl from 'jss-rtl';
import { create } from 'jss';

import { chartjs } from './helpers';
import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

function RTL(props) {
  return <StylesProvider jss={jss}>{props.children}</StylesProvider>;
}
export default class App extends Component {
  render() {
    return (
      <RTL>
        <ThemeProvider theme={theme}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </ThemeProvider>
      </RTL>
    );
  }
}
