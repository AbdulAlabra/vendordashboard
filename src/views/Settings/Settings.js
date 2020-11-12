import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import { Notifications, Password } from './components';
import { connect } from 'react-redux';
import { getLanguageDirectionState } from 'redux-selectors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}));

const Settings = props => {
  const classes = useStyles();

  return (
    <div dir={props.languageDirection} className={classes.root}>
      <Grid container spacing={4}>
        <Grid item md={7} xs={12}>
          <Notifications />
        </Grid>
        <Grid item md={5} xs={12}>
          <Password />
        </Grid>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    languageDirection: getLanguageDirectionState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
