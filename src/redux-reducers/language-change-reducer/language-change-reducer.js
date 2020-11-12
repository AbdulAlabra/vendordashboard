import { CHANGE_LANGUAGE } from 'redux-constants';
import i18next from 'translations-i18next';

const initialLangauge = i18next.language || 'ar';
const initialLanguageDirection = initialLangauge === 'ar' ? 'rtl' : 'ltr';

const initialState = {
  currentLangauge: initialLangauge,
  languageDirection: initialLanguageDirection
};

const languageChangeReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      return changeLanguageState(state, action.payload);

    default:
      return state;
  }
};

const changeLanguageState = (state, payload) => {
  const { newLanguage } = payload;
  if (payload.newLanguage === state.currentLangauge) {
    return state;
  } else {
    const currentLangauge = newLanguage;
    const languageDirection = newLanguage === 'ar' ? 'rtl' : 'ltr';
    const updatedState = { ...state, languageDirection, currentLangauge };

    return updatedState;
  }
};

export default languageChangeReducer;
