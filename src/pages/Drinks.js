import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Drinks extends React.Component {
  render() {
    const { nameDrink,
      drinkIngredient, firstLetterDrinks } = this.props;
    const number = 11;
    return (
      <div className="card">
        <Header title="Drinks" showIcon="true" />
        { nameDrink.filter((recipe, i) => i <= number).map((recipe, i1) => (
          <div
            className="cardRow"
            data-testid={ `${i1}-recipe-card` }
            key={ recipe.idDrink }
          >
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${i1}-card-img` }
            />
            <span data-testid={ `${i1}-card-name` }>
              { recipe.strDrink }
            </span>
          </div>
        )) }
        { firstLetterDrinks.filter((recipe, i) => i <= number).map((recipe, i2) => (
          <div
            className="cardRow"
            data-testid={ `${i2}-recipe-card` }
            key={ recipe.idDrink }
          >
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${i2}-card-img` }
            />
            <span data-testid={ `${i2}-card-name` }>
              { recipe.strDrink }
            </span>
          </div>
        )) }
        { drinkIngredient.filter((recipe, i) => i <= number).map((recipe, i3) => (
          <div
            className="cardRow"
            data-testid={ `${i3}-recipe-card` }
            key={ recipe.idDrink }
          >
            <img
              src={ recipe.strDrinkThumb }
              alt={ recipe.strDrink }
              data-testid={ `${i3}-card-img` }
            />
            <span data-testid={ `${i3}-card-name` }>
              { recipe.strDrink}
            </span>
          </div>
        )) }
        <Footer />
      </div>
    );
  }
}

Drinks.propTypes = {
  nameDrink: PropTypes.instanceOf(Object).isRequired,
  firstLetterDrinks: PropTypes.instanceOf(Object).isRequired,
  drinkIngredient: PropTypes.instanceOf(Object).isRequired,
};

const mapStateToProps = (state) => ({
  nameDrink: state.foodsReducer.nameDrink.drinks || [],
  firstLetterDrinks: state.foodsReducer.firstLetterDrinks.drinks || [],
  drinkIngredient: state.foodsReducer.drinkIngredient.drinks || [],
});

export default connect(mapStateToProps)(Drinks);
