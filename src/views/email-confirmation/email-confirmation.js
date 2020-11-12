import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import capitalize from 'capitalize';
import queryString from 'query-string';
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
import { connect } from 'react-redux';
import { getLanguageDirectionState, getAuthState } from 'redux-selectors';
import * as messages from 'messages';
import {
  sendConfirmationEmailThunk,
  tokenVerifyEmailThunk
} from 'redux-action-creators/user-auth-actions';
import * as translation from 'translations';
import transitions from 'theme/transitions';
import Fade from '@material-ui/core/Fade';
import { Language } from 'components';
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
  const query = queryString.parse(props.location.search);
  const { token, tokenId, targetEmail } = query;
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
  const [sendAgainCount, setSendAgainCount] = useState(0);

  useEffect(() => {
    const errors = [];
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    const { dispatchVerifyToken, dispatchSendConfirmationEmail } = props;

    const confirmToken = async () => {
      const payload = { token, tokenId };
      await dispatchVerifyToken(payload);
    };
    const sendEmailConfirmation = async () => {
      await dispatchSendConfirmationEmail(targetEmail.trim());
    };

    if (token && tokenId) {
      console.log('token check');
      confirmToken();
    } else {
      console.log('email check');
      sendEmailConfirmation();
      setFormState(prev => ({
        ...prev,
        values: {
          ...prev.values,
          email: targetEmail
        }
      }));
    }
  }, []);

  useEffect(() => {
    const { message } = props.auth;
    if (
      message === messages.already_confirmed ||
      message === messages.user_email_confirmed
    )
      history.replace(`/sign-in`);
  }, [props.auth.message]);

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
    setSendAgainCount(prev => prev + 1);
    setFormState(prev => ({
      ...prev,
      typing: false
    }));
    let { email } = formState.values;
    const { dispatchSendConfirmationEmail } = props;
    await dispatchSendConfirmationEmail(email.trim());
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
            <Fade in={true} timeout={transitions.duration.long}>
              <div className={classes.contentBody}>
                <form className={classes.form} onSubmit={handleSendEmail}>
                  <Typography className={classes.title} variant="h2">
                    {capitalize(translation.check_your_email)}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {
                      translation.a_verification_link_has_been_sent_to_your_email
                    }
                  </Typography>
                  <Typography align="center" color="error" gutterBottom>
                    {formState.typing === true ||
                    props.auth.isFetchingUser === true
                      ? ''
                      : translation[props.auth.message]}
                  </Typography>
                  <Typography align="center" color="primary" gutterBottom>
                    {props.auth.isEmailConfirmationSent
                      ? translation.an_email_has_been_sent_successfully
                      : ''}
                  </Typography>
                  <TextField
                    className={classes.textField}
                    error={
                      formState.typing || props.auth.isFetchingUser
                        ? false
                        : props.auth.isAuthError
                    }
                    fullWidth
                    helperText={
                      hasError('email') ? formState.errors.email[0] : null
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
                    disabled={props.auth.isFetchingUser || sendAgainCount >= 3}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    {translation.send_again}
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
    dispatchSendConfirmationEmail: payload =>
      dispatch(sendConfirmationEmailThunk(payload)),
    dispatchVerifyToken: payload => dispatch(tokenVerifyEmailThunk(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));
