import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import { errorRequest, getFoodByLetter,
  getFoodByIngredient, getFoodByName,
  getDrinkByIngredient, getDrinkByName,
  getDrinkByLetter,
  getTypeSearch } from '../redux/Actions/actions';

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
      /* if (getFoodJson.length < 1) {
        global.alert('Sorry, we havent found any recipes for these filters.');
      } */
      dispatch(getFoodByName(getFood));
    } catch (error) {
      dispatch(errorRequest(error));
    }
  };

  getFoodByFirstLetter = async (firstLetter) => {
    const { dispatch } = this.props;
    try {
      const foodEndpoint = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`);
      const getFoodFirstLetter = await foodEndpoint.json();
      dispatch(getFoodByLetter(getFoodFirstLetter));
    } catch (error) {
      global.alert('Your search must have only 1 (one) character');
    }
  };

  getDrinksByIngredients = async (ingrediente) => {
    const { dispatch } = this.props;
    try {
      const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingrediente}`);
      const drinkJson = await endpoint.json();
      dispatch(getDrinkByIngredient(drinkJson));
    } catch (error) {
      dispatch(errorRequest(error));
    }
  };

   getDrinksByNames = async (nome) => {
     const { dispatch } = this.props;
     try {
       const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nome}`);
       const getDrink = await endpoint.json();
       dispatch(getDrinkByName(getDrink));
     } catch (error) {
       dispatch(errorRequest(error));
     }
   };

   getDrinksByFirstLetter = async (primeiraLetra) => {
     const { dispatch } = this.props;
     try {
       const endpoint = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${primeiraLetra}`);
       const getDrinkByFirstLetter = await endpoint.json();
       dispatch(getDrinkByLetter(getDrinkByFirstLetter));
     } catch (error) {
       global.alert('Your search must have only 1 (one) character');
       dispatch(errorRequest(error));
     }
   };

  handleClick = ({ target }) => {
    const { id } = target;
    this.setState({
      idFilter: id,
    });
  }

  searchButton = () => {
    const { idFilter } = this.state;
    const { searchValue, dispatch } = this.props;
    const history = createBrowserHistory();
    dispatch(getTypeSearch(true));
    const { location: { pathname } } = history;
    if (idFilter === 'ingredient' && pathname.includes('foods')) {
      this.getFoodByIngredients(searchValue);
    } else if (idFilter === 'nameSearch' && pathname.includes('foods')) {
      this.getFoodByNames(searchValue);
    } else if (idFilter === 'firstLetter' && pathname.includes('foods')) {
      this.getFoodByFirstLetter(searchValue);
    } else if (idFilter === 'ingredient' && pathname.includes('drinks')) {
      this.getDrinksByIngredients(searchValue);
    } else if (idFilter === 'nameSearch' && pathname.includes('drinks')) {
      this.getDrinksByNames(searchValue);
    } else if (idFilter === 'firstLetter' && pathname.includes('drinks')) {
      this.getDrinksByFirstLetter(searchValue);
    }
  }

  render() {
    return (
      <div className="SbContainer">
        <span className="searchBar">
          <label htmlFor="ingredient" className="SbInput">
            <input
              name="optionFilter"
              data-testid="ingredient-search-radio"
              type="radio"
              id="ingredient"
              onClick={ this.handleClick }
            />
            Ingredient
          </label>
          <label htmlFor="nameSearch" className="SbInput">
            <input
              data-testid="name-search-radio"
              name="optionFilter"
              type="radio"
              id="nameSearch"
              onClick={ this.handleClick }
            />
            Name
          </label>
          <label htmlFor="firstLetter" className="SbInput">
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
            className="sBtn"
            data-testid="exec-search-btn"
            type="button"
            onClick={ this.searchButton }
          >
            Search
          </button>
        </span>
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
