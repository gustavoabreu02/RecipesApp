import { combineReducers } from 'redux';
import user from './reducer';
import headerReducer from './headerReducer';

const rootReducer = combineReducers({ user, headerReducer });

export default rootReducer;
