const ADD_USER = 'ADD_USER';
const ERROR_REQUEST = 'ERROR_REQUEST';
const CHANGE_TITLE = 'CHANGE_TITLE';

export { ADD_USER, ERROR_REQUEST, CHANGE_TITLE };

export const getUserEmail = (email) => ({ type: ADD_USER, email });

export const errorRequest = (error) => ({ type: ERROR_REQUEST, error });

export const changeTitle = (title) => ({ type: CHANGE_TITLE, title });

/* export const expensesApi = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getExpensesInfo(json)))
    .catch((error) => dispatch(errorRequest(error)));
}; */
