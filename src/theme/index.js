import { createMuiTheme } from '@material-ui/core';
import palette from './palette';
import typography from './typography';
import overrides from './overrides';
import direction from './direction';
import transitions from './transitions';

const theme = createMuiTheme({
  direction,
  palette,
  typography,
  overrides,
  transitions,
  zIndex: {
    appBar: 1200,
    drawer: 1100
  }
});

export default theme;
