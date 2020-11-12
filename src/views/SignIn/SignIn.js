import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import capitalize from 'capitalize';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { getLanguageDirectionState, getAuthState } from 'redux-selectors';
import {
  logInEmailPasswordThunk,
  logOutThunk
} from 'redux-action-creators/user-auth-actions';
import transitions from 'theme/transitions';
import { Language } from 'components';

import * as translation from 'translations';
import * as messages from 'messages';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    typing: false,
    redirect: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = [];
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    const { dispatchLogOut } = props;
    dispatchLogOut();
  }, []);

  const handleBack = () => {
    history.goBack();
  };

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      typing: true
    }));
  };

  const handelRequiredField = e => {
    e.preventDefault();
    e.persist();
    setFormState(prev => ({
      ...prev,
      errors: {
        ...prev.errors,
        [e.target.name]: translation.required
      }
    }));
  };

  const handleSignIn = async event => {
    event.preventDefault();

    const { email, password } = formState.values;
    const { dispatchLogInEmailPassword } = props;
    const user = await dispatchLogInEmailPassword({ email, password });
    setFormState(prev => ({
      ...prev,
      typing: false
    }));
    // const user = await isUserLoggedIn();
    // console.log('state', user.state);
    // console.log('isLoggedIn', user.isLoggedIn);
    // console.log('profile', user.profile);
    // console.log('identities', user.identities);
    // console.log('id', user.id);
    // console.log('deviceId', user.deviceId);
    // console.log('functions', user.functions);
    if (user.message === messages.email_confirmation_is_required)
      history.push(`/email-confirmation?targetEmail=${email}`);

    if (user.user) history.push('/');
  };

  const hasError = field => (formState.errors[field] ? true : false);
  return (
    <div dir={props.languageDirection} className={classes.root}>
      <Grid className={classes.grid} container>
        <Grid className={classes.quoteContainer} item lg={5}>
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography className={classes.quoteText} variant="h1">
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.person}>
                <Typography className={classes.name} variant="body1">
                  Takamaru Ayako
                </Typography>
                <Typography className={classes.bio} variant="body2">
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid className={classes.content} item lg={7} xs={12}>
          <div className={classes.content}>
            <Grid className={classes.contentHeader} container={true}>
              <Grid xs={11} item={true}>
                <IconButton onClick={handleBack}>
                  {props.languageDirection === 'ltr' ? (
                    <ArrowBackIcon />
                  ) : (
                    <ArrowForward />
                  )}
                </IconButton>
              </Grid>

              <Grid xs={1} item={true}>
                <Language />
              </Grid>
            </Grid>

            <Fade in={true} timeout={transitions.duration.standard}>
              <div className={classes.contentBody}>
                <form className={classes.form} onSubmit={handleSignIn}>
                  <Typography className={classes.title} variant="h2">
                    {capitalize(translation.welcome)}
                  </Typography>

                  <Typography color="textSecondary" gutterBottom>
                    {translation.sign_in_to_your_account}
                  </Typography>

                  <Typography align="center" color="error" gutterBottom>
                    {formState.typing === true
                      ? ''
                      : translation[props.auth.message]}
                  </Typography>

                  <TextField
                    className={classes.textField}
                    fullWidth
                    helperText={
                      hasError('email') ? formState.errors.email : null
                    }
                    label={capitalize(translation.email_address)}
                    name="email"
                    error={hasError('email')}
                    required={true}
                    onInvalid={handelRequiredField}
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError('password')}
                    helperText={
                      hasError('password') ? formState.errors.password : null
                    }
                    fullWidth
                    required={true}
                    onInvalid={handelRequiredField}
                    label={capitalize(translation.password)}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ''}
                    variant="outlined"
                  />

                  <Button
                    className={classes.signInButton}
                    color="primary"
                    disabled={props.auth.isFetchingUser}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    {translation.sign_in_now}
                  </Button>

                  <Typography color="textSecondary" variant="body1">
                    {`${translation.dont_have_an_account} ${translation.or} ${translation.forgot_password}${translation.question_mark} `}

                    <Link component={RouterLink} to="/sign-up" variant="h6">
                      {translation.sign_up}
                    </Link>
                    {` ${translation.or} `}

                    <Link
                      component={RouterLink}
                      to="/password-reset"
                      variant="h6">
                      {translation.reset_password}
                    </Link>
                  </Typography>
                </form>
              </div>
            </Fade>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

SignIn.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state => {
  return {
    languageDirection: getLanguageDirectionState(state),
    auth: getAuthState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogInEmailPassword: payload =>
      dispatch(logInEmailPasswordThunk(payload)),
    dispatchLogOut: () => dispatch(logOutThunk())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
