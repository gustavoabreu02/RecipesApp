import { legacies as createStore, applyMiddleware } from 'redux';
import rootReducer from './Reducer/reducer';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
