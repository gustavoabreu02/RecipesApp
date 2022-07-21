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
    const { foodsIngredients, foodsName, foodsFirstLetter } = this.props;
    return (
      <div className="container-search-bar">
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
            const { searchValue, page } = this.props;
            if (idFilter === 'ingredient' && page === 'foods') {
              this.getFoodByIngredients(searchValue);
            } else if (idFilter === 'nameSearch' && page === 'foods') {
              this.getFoodByNames(searchValue);
            } else if (idFilter === 'firstLetter' && page === 'foods') {
              this.getFoodByFirstLetter(searchValue);
            } else if (idFilter === 'ingredient' && page === 'drinks') {
              this.getDrinksByIngredients(searchValue);
            } else if (idFilter === 'nameSearch' && page === 'drinks') {
              this.getDrinksByNames(searchValue);
            } else if (idFilter === 'firstLetter' && page === 'drinks') {
              this.getDrinksByFirstLetter(searchValue);
            }
          } }
        >
          Search
        </button>
        { foodsIngredients.map((receita, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ receita.idMeal }>
            <img
              src={ receita.strMealThumb }
              alt={ receita.strMeal }
              data-testid={ `${index}-card-img ` }
            />
            <span data-testid={ `${index}-card-name` }>
              { receita.strMeal }
              {' '}
            </span>
          </div>
        )) }
        { foodsName.map((receita, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ receita.idMeal }>
            <img src={ receita.strMealThumb } alt={ receita.strMeal } />
            <span data-testid={ `${index}-card-name` }>
              { receita.strMeal }
              {' '}
            </span>
          </div>
        )) }
        { foodsFirstLetter.map((receita, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ receita.idMeal }>
            <img
              src={ receita.strMealThumb }
              alt={ receita.strMeal }
              data-testid={ `${index}-card-img ` }
            />
            <span data-testid={ `${index}-card-name` }>
              { receita.strMeal }
            </span>
          </div>
        )) }
      </div>
    );
  }
}

SearchBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  foodsIngredients: PropTypes.instanceOf(Object).isRequired,
  foodsName: PropTypes.instanceOf(Object).isRequired,
  foodsFirstLetter: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  searchValue: state.foodsReducer.searchValue,
  page: state.foodsReducer.page,
  foodsIngredients: state.foodsReducer.ingredient.meals,
  foodsName: state.foodsReducer.name.meals,
  foodsFirstLetter: state.foodsReducer.firstLetter.meals,
});

export default connect(mapStateToProps)(SearchBar);
