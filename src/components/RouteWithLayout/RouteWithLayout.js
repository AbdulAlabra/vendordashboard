import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getIsLoggedInState } from 'redux-selectors';
import { authorizationRequestThunk } from 'redux-action-creators/user-auth-actions';
import { connect } from 'react-redux';

const RouteWithLayout = props => {
  const {
    isLoggedIn,
    isProtected,
    isAuthorize,
    layout: Layout,
    component: Component,
    ...rest
  } = props;
  return (
    <Route
      {...rest}
      render={matchProps => {
        //console.log(matchProps.history);
        //matchProps.history.push('/');
        if (isLoggedIn || !isProtected || isAuthorize().user) {
          return <Layout>{<Component {...matchProps} />}</Layout>;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/sign-in',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string
};

const mapStateToProps = state => {
  return {
    isLoggedIn: getIsLoggedInState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    isAuthorize: () => dispatch(authorizationRequestThunk())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RouteWithLayout);
