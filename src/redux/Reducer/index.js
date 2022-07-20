import { combineReducers } from 'redux';
import user from './reducer';
import foodsReducer from './foodsReducer';

const rootReducer = combineReducers({ user, foodsReducer });

export default rootReducer;
