import { ERROR_REQUEST, FIRST_LETTER, ADD_INGREDIENT,
  ADD_BYNAME,
  ADD_SEARCH_VALUE } from '../Actions/actions';

const INITIAL_STATE = {
  ingredient: '',
  name: '',
  firstLetter: [],
  searchValue: '',
};
const foodsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FIRST_LETTER:
    return { ...state, firstLetter: action.first,
    };
  case ADD_INGREDIENT:
    return { ...state, ingredient: action.ingredient,
    };
  case ADD_BYNAME:
    return { ...state, name: action.name,
    };
  case ERROR_REQUEST:
    return { ...state, name: action.error,
    };
  case ADD_SEARCH_VALUE:
    return { ...state, searchValue: action.searchValue,
    };
  default:
    return state;
  }
};
export default foodsReducer;
