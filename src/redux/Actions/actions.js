const ADD_USER = 'ADD_USER';
const ERROR_REQUEST = 'ERROR_REQUEST';
const FIRST_LETTER = 'FIRST_LETTER';
const ADD_INGREDIENT = 'ADD_INGREDIENT';
const ADD_BYNAME = 'ADD_BYNAME';

export { ADD_USER, ERROR_REQUEST, FIRST_LETTER, ADD_INGREDIENT, ADD_BYNAME };

export const getUserEmail = (email) => ({ type: ADD_USER, email });

export const errorRequest = (error) => ({ type: ERROR_REQUEST, error });

export const getFoodByLetter = (first) => ({ type: FIRST_LETTER, first });

export const getFoodByIngredient = (ingredient) => ({ type: ADD_INGREDIENT, ingredient });

export const getFoodByName = (name) => ({ type: ADD_BYNAME, name });

/* export const expensesApi = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getExpensesInfo(json)))
    .catch((error) => dispatch(errorRequest(error)));
}; */
