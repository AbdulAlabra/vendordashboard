import { getLanguageDirectionState } from 'redux-selectors';
import store from 'redux-store';

const direction = getLanguageDirectionState(store.getState());
export default direction;
