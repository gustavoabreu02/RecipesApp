import { CHANGE_TITLE } from '../Actions/actions';

const INITIAL_STATE = {
  title: '',
};

const headerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_TITLE:
    return { ...state, email: action.email,
    };
  default:
    return state;
  }
};

export default headerReducer;
