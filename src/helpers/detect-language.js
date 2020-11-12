import languageIdentifier from 'language-identifier';

/**
 *
 * @param {string} text any text you want to detect the lanaguge for
 * @param {string} mode the mode you want to run the function in such as strict
 */
const detectLanguage = (text, mode) => {
  let splitedText = text.split('');

  let arabicScore = 0;
  let englishScore = 0;

  splitedText.map(car => {
    const result = languageIdentifier.identify(car);
    let isArabic = result.includes('Arabic');
    let isEnglish = result.includes('English');
    if (isArabic) arabicScore++;
    if (isEnglish) englishScore++;
  });

  switch (mode) {
    case 'strict':
      return strictMode(arabicScore, englishScore);
    default:
      return easyMode(arabicScore, englishScore);
  }
};

const easyMode = (arabicScore, englishScore) => {
  if (arabicScore >= 1) {
    return response('ar', 'arabic');
  } else {
    return response('en', 'english');
  }
};

const strictMode = (arabicScore, englishScore) => {
  if (arabicScore > englishScore) {
    return response('ar', 'arabic');
  } else {
    return response('en', 'english');
  }
};

const response = (languageCode, language) => {
  return { languageCode, language };
};

export default detectLanguage;
