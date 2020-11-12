import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { connect } from 'react-redux';
import { getLanguageDirectionState } from 'redux-selectors';

import { CustomersToolbar, CustomersTable } from './components';
import mockData from './data';

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

  const [users] = useState(mockData);

  return (
    <div dir={props.languageDirection} className={classes.root}>
      <CustomersToolbar />
      <div className={classes.content}>
        <CustomersTable users={users} />
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
