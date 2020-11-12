import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from 'redux-reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

const reduxMiddleware = applyMiddleware(thunk);
const store = createStore(allReducers, composeWithDevTools(reduxMiddleware));

export default store;
