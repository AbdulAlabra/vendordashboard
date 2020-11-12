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
import queryString from 'query-string';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import { connect } from 'react-redux';
import { getLanguageDirectionState, getAuthState } from 'redux-selectors';
import {
  sendPasswordResetEmailThunk,
  resetPasswordThunk
} from 'redux-action-creators/user-auth-actions';
import transitions from 'theme/transitions';
import Fade from '@material-ui/core/Fade';
import { Language } from 'components';
import * as messages from 'messages';
import * as translation from 'translations';

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
  const query = queryString.parse(props.location.search);
  const { token, tokenId } = query;

  const [sendEmailCount, setSendEmailCount] = useState(0);
  const [isVerifyToken, setIsVerifyToken] = useState(false);
  const [formState, setFormState] = useState({
    isValid: false,
    passwordMatch: true,
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
      errors: errors || {},
      passwordMatch: true,
      typing: true
    }));
  }, [formState.values]);

  useEffect(() => {
    const { isResetPasswordEmailSent } = props.auth;
    if (isResetPasswordEmailSent) setSendEmailCount(prev => prev + 1);
  }, [props.auth.isResetPasswordEmailSent]);

  useEffect(() => {
    const { isPasswordResetSuccess } = props.auth;
    if (isPasswordResetSuccess)
      setTimeout(() => {
        history.replace('/sign-in');
      }, 1000);
  }, [props.auth.isPasswordResetSuccess]);

  useEffect(() => {
    const { message } = props.auth;
    if (message === messages.invalid_token) {
      history.replace('/password-reset');
      window.location.reload();
    }
  }, [props.auth.isAuthError]);

  useEffect(() => {
    if (tokenId && token) {
      setIsVerifyToken(() => true);
    } else {
      setIsVerifyToken(() => false);
    }
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

  const handleSendEmail = async event => {
    event.preventDefault();
    setFormState(prev => ({
      ...prev,
      typing: false
    }));
    const { email } = formState.values;
    const { dispatchSendPasswordResetEmail } = props;
    await dispatchSendPasswordResetEmail(email);
  };

  const handleResetPassword = async event => {
    event.preventDefault();
    setFormState(prev => ({
      ...prev,
      typing: false
    }));
    const { password, confirmPassword } = formState.values;
    const { dispatchPasswordReset } = props;
    const payload = {
      token,
      tokenId,
      password
    };
    if (password === confirmPassword) {
      await dispatchPasswordReset(payload);
    } else {
      setFormState(prev => ({
        ...prev,
        passwordMatch: false,
        typing: false
      }));
    }
  };

  const hasError = field => {
    return formState.touched[field] && formState.errors[field] ? true : false;
  };

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
                <form
                  hidden={!isVerifyToken}
                  onSubmit={handleResetPassword}
                  className={classes.form}>
                  <Typography className={classes.title} variant="h2">
                    {capitalize(translation.reset_password)}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {translation.create_new_password}
                  </Typography>
                  <Typography align="center" color="primary" gutterBottom>
                    {props.auth.isPasswordResetSuccess
                      ? translation.your_password_has_been_reset_successfully
                      : ''}
                  </Typography>
                  <TextField
                    className={classes.textField}
                    error={
                      formState.typing
                        ? false
                        : props.auth.isAuthError || !formState.passwordMatch
                    }
                    fullWidth
                    helperText={
                      formState.typing === false &&
                      props.auth.isAuthError === true
                        ? translation[props.auth.message] ||
                          translation.not_valid
                        : ''
                    }
                    label={capitalize(translation.new_password)}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={
                      formState.typing
                        ? false
                        : props.auth.isAuthError || !formState.passwordMatch
                    }
                    fullWidth
                    helperText={
                      formState.passwordMatch === false
                        ? translation.password_does_not_match
                        : formState.typing === false &&
                          props.auth.isAuthError === true
                        ? translation[props.auth.message] ||
                          translation.not_valid
                        : ''
                    }
                    label={capitalize(translation.confirm_password)}
                    name="confirmPassword"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.confirmPassword || ''}
                    variant="outlined"
                  />
                  <Button
                    className={classes.signInButton}
                    color="secondary"
                    disabled={
                      props.auth.isPasswordResetSuccess ||
                      props.auth.isFetchingUser ||
                      sendEmailCount >= 3
                    }
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    {sendEmailCount >= 1
                      ? translation.send_again
                      : translation.send}
                  </Button>
                </form>

                <form
                  hidden={isVerifyToken}
                  className={classes.form}
                  onSubmit={handleSendEmail}>
                  <Typography className={classes.title} variant="h2">
                    {capitalize(translation.reset_password)}
                  </Typography>

                  <Typography color="textSecondary" gutterBottom>
                    {
                      translation.enter_your_email_to_receive_password_reset_link
                    }
                  </Typography>

                  <Typography align="center" color="primary" gutterBottom>
                    {props.auth.isResetPasswordEmailSent
                      ? translation.reset_password_link_is_sent_to_your_email
                      : ''}
                  </Typography>

                  <TextField
                    className={classes.textField}
                    error={formState.typing ? false : props.auth.isAuthError}
                    fullWidth
                    helperText={
                      formState.typing === false &&
                      props.auth.isAuthError === true
                        ? translation[props.auth.message] ||
                          translation.not_valid
                        : ''
                    }
                    label={capitalize(translation.email_address)}
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
                    variant="outlined"
                  />

                  <Button
                    className={classes.signInButton}
                    color="secondary"
                    disabled={props.auth.isFetchingUser || sendEmailCount >= 3}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    {sendEmailCount >= 1
                      ? translation.send_again
                      : translation.send}
                  </Button>

                  <Typography color="textSecondary" variant="body1">
                    {`${translation.you_have_an_account}${translation.question_mark} `}
                    <Link component={RouterLink} to="/sign-in" variant="h6">
                      {translation.sign_in}
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
    dispatchSendPasswordResetEmail: payload =>
      dispatch(sendPasswordResetEmailThunk(payload)),

    dispatchPasswordReset: payload => dispatch(resetPasswordThunk(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
