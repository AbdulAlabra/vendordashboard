import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  getLanguageDirectionState,
  getCurrentLanguageState
} from 'redux-selectors';
import { chnageLnagugeThunk } from 'redux-action-creators/language-actions';
import { connect } from 'react-redux';
import * as translations from 'translations';
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200
  }
}));

const Language = props => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [age, setAge] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(props.currentLangauge);
  }, [props.currentLangauge]);

  const handleChange = event => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setValue(props.currentLangauge);
  };
  const onChangeLangauge = async () => {
    const { dispatchChangeLanguage } = props;
    const payload = { newLanguage: value };
    if (value === props.currentLangauge) {
      handleClose();
    } else {
      await dispatchChangeLanguage(payload);
      window.location.reload();
    }
  };
  return (
    <div dir={props.languageDirection}>
      <Button onClick={handleClickOpen}>
        {props.currentLangauge === 'en'
          ? translations.English
          : translations.Arabic}
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle dir={props.languageDirection}>
          {translations.language_settings}
        </DialogTitle>
        <DialogContent dir={props.languageDirection}>
          <form className={classes.container}>
            <FormControl className={classes.formControl} component="fieldset">
              <RadioGroup
                aria-label="language"
                name="languageOption"
                value={value}
                onChange={handleChange}>
                <FormControlLabel
                  value="ar"
                  control={<Radio />}
                  label={translations.Arabic}
                />
                <FormControlLabel
                  value="en"
                  control={<Radio />}
                  label={translations.English}
                />
              </RadioGroup>
            </FormControl>
          </form>
        </DialogContent>

        <DialogActions dir={props.languageDirection}>
          <Button onClick={handleClose} color="default">
            {translations.cancel}
          </Button>
          <Button onClick={onChangeLangauge} color="primary">
            {translations.change}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    languageDirection: getLanguageDirectionState(state),
    currentLangauge: getCurrentLanguageState(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchChangeLanguage: payload => dispatch(chnageLnagugeThunk(payload))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Language);
