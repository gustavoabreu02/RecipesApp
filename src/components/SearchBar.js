import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { errorRequest, getFoodByLetter,
  getFoodByIngredient, getFoodByName } from '../redux/Actions/actions';

class SearchBar extends React.Component {
  state = {
    idFilter: '',
  }

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
      alert('Your search must have only 1 (one) character');
    }
  };

  handleClick = ({ target }) => {
    const { id } = target;
    this.setState({
      idFilter: id,
    });
  }

  render() {
    return (
      <div>
        <label htmlFor="ingredient">
          <input
            name="optionFilter"
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            onClick={ this.handleClick }
          />
          Ingredient
        </label>
        <label htmlFor="nameSearch">
          <input
            data-testid="name-search-radio"
            name="optionFilter"
            type="radio"
            id="nameSearch"
            onClick={ this.handleClick }
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            name="optionFilter"
            type="radio"
            id="firstLetter"
            onClick={ this.handleClick }
          />
          First letter
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ () => {
            const { idFilter } = this.state;
            const { searchValue } = this.props;
            if (idFilter === 'ingredient') {
              this.getFoodByIngredients(searchValue);
            } else if (idFilter === 'nameSearch') {
              this.getFoodByNames(searchValue);
            } else if (idFilter === 'firstLetter') {
              this.getFoodByFirstLetter(searchValue);
            }
          } }
        >
          Search
        </button>
      </div>
    );
  }
}
SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  searchValue: state.foodsReducer.searchValue,
});
export default connect(mapStateToProps)(SearchBar);
