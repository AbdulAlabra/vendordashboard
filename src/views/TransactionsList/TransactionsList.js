import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import { UsersToolbar, UsersTable } from './components';
import mockData from './data';

import { connect } from 'react-redux';
import { getLanguageDirectionState } from 'redux-selectors';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const UserList = props => {
  const classes = useStyles();

  const [transactions] = useState(mockData);

  return (
    <div dir={props.languageDirection} className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={transactions} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
