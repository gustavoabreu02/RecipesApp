import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { errorRequest, getFoodByLetter,
  getFoodByIngredient, getFoodByName,
  getDrinkByIngredient, getDrinkByName } from '../redux/Actions/actions';

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
       dispatch((getDrinkByFirstLetter));
     } catch (error) {
       dispatch(errorRequest(error));
       global.alert('Your search must have only 1 (one) character');
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
            onClick={ () => {
              const { idFilter } = this.state;
              const { searchValue } = this.props;
              if (idFilter === 'ingredient'/*  && page === 'foods' */) {
                this.getFoodByIngredients(searchValue);
                this.getDrinksByIngredients(searchValue);
              } else if (idFilter === 'nameSearch'/*  && page === 'foods' */) {
                this.getFoodByNames(searchValue);
                this.getDrinksByNames(searchValue);
              } else if (idFilter === 'firstLetter'/*  && page === 'foods' */) {
                this.getFoodByFirstLetter(searchValue);
                this.getDrinksByFirstLetter(searchValue);
              }
            } }
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
