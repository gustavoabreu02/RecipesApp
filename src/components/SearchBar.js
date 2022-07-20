import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { errorRequest, getFoodByLetter,
  getFoodByIngredient, getFoodByName } from '../redux/Actions/actions';

class SearchBar extends React.Component {
  render() {
    getFoodByIngredients = async (ingrediente) => {
      const { dispatch } = this.props;
      try {
        const foodEndpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
        const getFoodJson = await foodEndpoint.json();
        dispatch(getFoodByIngredient(getFoodJson));
      } catch (error) {
        dispatch(errorRequest(error));
      }
    };

    getFoodByNames = async (nome) => {
      const { dispatch } = this.props;
      try {
        const foodEndpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`);
        const getFood = await foodEndpoint.json();
        dispatch(getFoodByName(getFood));
      } catch (error) {
        dispatch(errorRequest(error));
      }
    };

    getFoodByFirstLetter = async (firstLetter) => {
      const { dispatch } = this.props;
      try {
        const foodEndpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
        const getFoodByFirstLetter = await foodEndpoint.json();
        dispatch(getFoodByLetter(getFoodByFirstLetter));
      } catch (error) {
        dispatch(errorRequest(error));
      }
    };

    return (
      <div>
        <label htmlFor="ingredient">
          <input
            name="ingredient"
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            onClick={ this.getFoodByIngredients }
          />
          Ingredient
        </label>
        <label htmlFor="nameSearch">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="nameSearch"
            onClick={ this.getFoodByNames }
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="firstLetter"
            onClick={ this.getFoodByFirstLetter }
          />
          First letter
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ this.showInput }
        >
          Search
        </button>
      </div>
    );
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};
export default connect()(SearchBar);
