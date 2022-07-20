import { ERROR_REQUEST, FIRST_LETTER, ADD_INGREDIENT,
  ADD_BYNAME,
  ADD_SEARCH_VALUE, SEARCH_INGREDIENT, SEARCH_NAME,
  SEARCH_LETTER } from '../Actions/actions';

const INITIAL_STATE = {
  ingredient: { meals: [] },
  name: { meals: [] },
  firstLetter: { meals: [] },
  searchValue: '',
  drinkIngredient: { meals: [] },
  nameDrink: { meals: [] },
  firstLetterDrinks: { meals: [] },
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
  case SEARCH_INGREDIENT:
    return { ...state, drinkIngredient: action.ingredient,
    };
  case SEARCH_NAME:
    return { ...state, nameDrink: action.name,
    };
  case SEARCH_LETTER:
    return { ...state, firstLetterDrinks: action.first,
    };
  default:
    return state;
  }
};
export default foodsReducer;
