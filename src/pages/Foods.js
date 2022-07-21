import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Foods extends React.Component {
  render() {
    const {
      foodsIngredients,
      foodsName,
      foodsFirstLetter,
      nameDrink,
      drinkIngredient, firstLetterDrinks,
    } = this.props;
    const number = 11;
    return (
      <div className="foodMain">
        <Header title="Foods" showIcon="true" { ...this.props } />
        <div className="card">
          { foodsIngredients.filter((recipe, i) => i <= number).map((recipe, index) => (
            <div
              className="cardRow"
              data-testid={ `${index}-recipe-card` }
              key={ recipe.idMeal }
            >
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img ` }
              />
              <span data-testid={ `${index}-card-name` }>
                { recipe.strMeal }
              </span>
            </div>
          )) }
          { foodsName.filter((recipe, i) => i <= number).map((recipe, index) => (
            <div
              className="cardRow"
              data-testid={ `${index}-recipe-card` }
              key={ recipe.idMeal }
            >
              <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
              <span data-testid={ `${index}-card-name` }>
                { recipe.strMeal }
              </span>
            </div>
          )) }
          { foodsFirstLetter.filter((recipe, i) => i <= number).map((recipe, inde) => (
            <div
              className="cardRow"
              data-testid={ `${inde}-recipe-card` }
              key={ recipe.idMeal }
            >
              <img
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${inde}-card-img ` }
              />
              <span data-testid={ `${inde}-card-name` }>
                { recipe.strMeal }
              </span>
            </div>
          )) }
          { nameDrink.filter((recipe, i) => i <= number).map((recipe, indi) => (
            <div
              className="cardRow"
              data-testid={ `${indi}-recipe-card` }
              key={ recipe.idDrink }
            >
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${indi}-card-img ` }
              />
              <span data-testid={ `${indi}-card-name` }>
                { recipe.strDrink }
              </span>
            </div>
          )) }
          { firstLetterDrinks.filter((recipe, i) => i <= number).map((recipe, ind) => (
            <div
              className="cardRow"
              data-testid={ `${ind}-recipe-card` }
              key={ recipe.idDrink }
            >
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${ind}-card-img ` }
              />
              <span data-testid={ `${ind}-card-name` }>
                { recipe.strDrink }
              </span>
            </div>
          )) }
          { drinkIngredient.filter((recipe, i) => i <= number).map((recipe, indc) => (
            <div
              className="cardRow"
              data-testid={ `${indc}-recipe-card` }
              key={ recipe.idDrink }
            >
              <img
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
                data-testid={ `${indc}-card-img ` }
              />
              <span data-testid={ `${indc}-card-name` }>
                { recipe.strDrink}
              </span>
            </div>
          )) }
        </div>
        <Footer { ...this.props } />
      </div>
    );
  }
}

Foods.propTypes = {
  foodsIngredients: PropTypes.instanceOf(Object).isRequired,
  foodsName: PropTypes.instanceOf(Object).isRequired,
  foodsFirstLetter: PropTypes.instanceOf(Object).isRequired,
  nameDrink: PropTypes.instanceOf(Object).isRequired,
  firstLetterDrinks: PropTypes.instanceOf(Object).isRequired,
  drinkIngredient: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  foodsIngredients: state.foodsReducer.ingredient.meals || [],
  foodsName: state.foodsReducer.name.meals || [],
  foodsFirstLetter: state.foodsReducer.firstLetter.meals || [],
  nameDrink: state.foodsReducer.nameDrink.drinks || [],
  firstLetterDrinks: state.foodsReducer.firstLetterDrinks.drinks || [],
  drinkIngredient: state.foodsReducer.drinkIngredient.drinks || [],
});

export default connect(mapStateToProps)(Foods);
