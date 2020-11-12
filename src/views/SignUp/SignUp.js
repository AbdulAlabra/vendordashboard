import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  logOutThunk,
  signUpThunk,
  sendConfirmationEmailThunk
} from 'redux-action-creators/user-auth-actions';
import { getLanguageDirectionState, getAuthState } from 'redux-selectors';
import { connect } from 'react-redux';
import * as translation from 'translations';
import capitalize from 'capitalize';
import * as messages from 'messages';
import transitions from 'theme/transitions';
import Fade from '@material-ui/core/Fade';
import Slide from '@material-ui/core/Slide';
import { Language } from 'components';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';

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
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignUp = props => {
  const { history } = props;
  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
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
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleBack = () => {
    history.goBack();
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
  const handleSignUp = async event => {
    event.preventDefault();
    const { dispatchSignUp } = props;
    const { email, lastName, password, phone, firstName } = formState.values;
    const userInfo = {
      email,
      lastName,
      password,
      phone,
      firstName
    };
    const user = await dispatchSignUp(userInfo);
    if (user.user) {
      history.push('/');
    } else {
      setFormState(formState => ({
        ...formState,
        errors: {
          [user.key]: translation[user.message] || translation.not_valid
        }
      }));
    }
  };
  const handleSendEmailConfirmation = async event => {
    setSendAgainCount(prev => prev + 1);
    event.preventDefault();
    const { dispatchSendEmailConfirmation } = props;
    let { email } = formState.values;

    await dispatchSendEmailConfirmation(email.trim());
  };

  const hasError = field => (formState.errors[field] ? true : false);
  return (
    <div
      dir={props.languageDirection}
      className={`${classes.root} ${props.className}`}>
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
                <Slide
                  in={props.auth.isSignedUp}
                  direction={
                    props.languageDirection === 'ltr' ? 'left' : 'right'
                  }
                  timeout={transitions.duration.standard}>
                  <div hidden={!props.auth.isSignedUp} className={classes.form}>
                    <Typography className={classes.title} variant="h2">
                      {capitalize(
                        translation.your_account_is_created_successfully
                      )}
                    </Typography>

                    <Typography color="textPrimary">
                      {capitalize(
                        translation.a_verification_link_has_been_sent_to_your_email
                      )}
                    </Typography>
                    <Typography
                      className={classes.title}
                      color="primary"
                      variant="h6">
                      {`${formState.values.email}`}
                    </Typography>

                    <br />
                    <br />
                    <br />
                    <Typography align="center" color="primary" gutterBottom>
                      {props.auth.isEmailConfirmationSent
                        ? translation.an_email_has_been_sent_successfully
                        : ''}
                    </Typography>
                    <Button
                      className={classes.signUpButton}
                      color="secondary"
                      onClick={handleSendEmailConfirmation}
                      disabled={false}
                      disabled={
                        props.auth.isFetchingUser || sendAgainCount >= 3
                      }
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained">
                      {translation.send_again}
                    </Button>
                  </div>
                </Slide>

                <form
                  hidden={props.auth.isSignedUp}
                  className={classes.form}
                  onSubmit={handleSignUp}>
                  <Typography className={classes.title} variant="h2">
                    {capitalize(translation.create_new_account)}
                  </Typography>
                  <Typography color="textSecondary" gutterBottom>
                    {capitalize(
                      translation.use_your_email_to_create_a_new_account
                    )}
                  </Typography>
                  <Typography color="error" align="center">
                    {props.auth.message === messages.something_went_wrong
                      ? translation.something_went_wrong_please_try_again_later
                      : ''}
                  </Typography>
                  <TextField
                    className={classes.textField}
                    error={hasError('firstName')}
                    fullWidth
                    helperText={
                      hasError('firstName') ? formState.errors.firstName : null
                    }
                    required={true}
                    onInvalid={handelRequiredField}
                    label={capitalize(translation.first_name)}
                    name="firstName"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.firstName || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError('lastName')}
                    fullWidth
                    helperText={
                      hasError('lastName') ? formState.errors.lastName : null
                    }
                    required={true}
                    onInvalid={handelRequiredField}
                    label={capitalize(translation.last_name)}
                    name="lastName"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.lastName || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError('phone')}
                    fullWidth
                    helperText={
                      hasError('phone') ? formState.errors.phone : null
                    }
                    required={true}
                    onInvalid={handelRequiredField}
                    label={capitalize(translation.phone)}
                    name="phone"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.phone || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError('email')}
                    fullWidth
                    helperText={
                      hasError('email') ? formState.errors.email : null
                    }
                    required={true}
                    onInvalid={handelRequiredField}
                    label={capitalize(translation.email_address)}
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.textField}
                    error={hasError('password')}
                    fullWidth
                    helperText={
                      hasError('password') ? formState.errors.password : null
                    }
                    required={true}
                    onInvalid={handelRequiredField}
                    label={capitalize(translation.password)}
                    name="password"
                    onChange={handleChange}
                    type="password"
                    value={formState.values.password || ''}
                    variant="outlined"
                  />
                  <div className={classes.policy}>
                    <Checkbox
                      checked={formState.values.policy || false}
                      className={classes.policyCheckbox}
                      color="primary"
                      name="policy"
                      onChange={handleChange}
                    />
                    <Typography
                      className={classes.policyText}
                      color="textSecondary"
                      variant="body1">
                      {`${translation.i_have_read_the} `}
                      <Link
                        color="primary"
                        component={RouterLink}
                        to="#"
                        underline="always"
                        variant="h6">
                        {translation.terms_and_conditions}
                      </Link>
                    </Typography>
                  </div>
                  {hasError('policy') && (
                    <FormHelperText error>
                      {formState.errors.policy[0]}
                    </FormHelperText>
                  )}
                  <Button
                    className={classes.signUpButton}
                    color="primary"
                    disabled={false}
                    disabled={props.auth.isFetchingUser}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained">
                    {translation.sign_up_now}
                  </Button>
                  <Typography color="textSecondary" variant="body1">
                    {`${capitalize(translation.you_have_an_account)} ${
                      translation.question_mark
                    } `}
                    <Link component={RouterLink} to="/sign-in" variant="h6">
                      {capitalize(translation.sign_in)}
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

SignUp.propTypes = {
  history: PropTypes.object
};

const mapStateToProps = state => {
  return {
    auth: getAuthState(state),
    languageDirection: getLanguageDirectionState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSignUp: payload => dispatch(signUpThunk(payload)),
    dispatchLogOut: payload => dispatch(logOutThunk(payload)),
    dispatchSendEmailConfirmation: payload =>
      dispatch(sendConfirmationEmailThunk(payload))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignUp));
