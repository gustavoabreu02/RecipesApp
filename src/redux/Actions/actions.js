const ADD_USER = 'ADD_USER';
const ERROR_REQUEST = 'ERROR_REQUEST';

export { ADD_USER, ERROR_REQUEST };

export const getUserEmail = (email) => ({ type: ADD_USER, email });

export const errorRequest = (error) => ({ type: ERROR_REQUEST, error });

/* export const expensesApi = () => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((json) => dispatch(getExpensesInfo(json)))
    .catch((error) => dispatch(errorRequest(error)));
}; */
