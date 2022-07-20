const ADD_USER = 'ADD_USER';
const ERROR_REQUEST = 'ERROR_REQUEST';
const FIRST_LETTER = 'FIRST_LETTER';
const ADD_INGREDIENT = 'ADD_INGREDIENT';
const ADD_BYNAME = 'ADD_BYNAME';
const ADD_SEARCH_VALUE = 'ADD_SEARCH_VALUE';
const SEARCH_INGREDIENT = 'SEARCH_INGREDIENT';
const SEARCH_NAME = 'SEARCH_NAME';
const SEARCH_LETTER = 'SEARCH_LETTER';

export { ADD_USER, ERROR_REQUEST, FIRST_LETTER, ADD_INGREDIENT, ADD_BYNAME
  , ADD_SEARCH_VALUE, SEARCH_INGREDIENT, SEARCH_NAME, SEARCH_LETTER };

export const getUserEmail = (email) => ({ type: ADD_USER, email });
export const errorRequest = (error) => ({ type: ERROR_REQUEST, error });
export const getFoodByLetter = (first) => ({ type: FIRST_LETTER, first });
export const getFoodByIngredient = (ingredient) => ({ type: ADD_INGREDIENT, ingredient });
export const getFoodByName = (name) => ({ type: ADD_BYNAME, name });
export const getSearchValue = (searchValue) => ({ type: ADD_SEARCH_VALUE, searchValue });

export const getDrinkByIngredient = (ingredient) => ({ type: SEARCH_INGREDIENT,
  ingredient });
export const getDrinkByName = (name) => ({ type: SEARCH_NAME, name });
export const getDrinkFirstByLetter = (first) => ({ type: SEARCH_LETTER, first });
