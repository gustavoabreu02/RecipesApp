import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
/* import Header from '../components/Header'; */

class ComponentDrinks extends React.Component {
  render() {
    const { nameDrink, firstLetterDrinks, drinkIngredient,
    } = this.props;
    const number = 11;
    return (
      <div className="body color">
        <div className="cardContainer">
          { nameDrink.length === 1
            ? (<Redirect to={ `/drinks/${nameDrink[0].idDrink}` } />)
            : (
              nameDrink.filter((recipe, i) => i <= number).map((recipe, i1) => (
                <div
                  className="individualCardC"
                  key={ recipe.idDrink }
                  data-testid={ `${i1}-recipe-card` }
                >
                  <img
                    className="imgFandD"
                    src={ recipe.strDrinkThumb }
                    alt={ recipe.strDrink }
                    data-testid={ `${i1}-card-img` }
                  />
                  <span data-testid={ `${i1}-card-name` }>
                    { recipe.strDrink }
                  </span>
                </div>
              ))
            )}
          { firstLetterDrinks.length === 1
            ? (<Redirect to={ `/drinks/${firstLetterDrinks[0].idDrink}` } />)
            : (
              firstLetterDrinks.filter((recipe, i) => i <= number)
                .map((recipe, i1) => (
                  <div
                    className="individualCardC"
                    key={ recipe.idDrink }
                    data-testid={ `${i1}-recipe-card` }
                  >
                    <img
                      className="imgFandD"
                      src={ recipe.strDrinkThumb }
                      alt={ recipe.strDrink }
                      data-testid={ `${i1}-card-img` }
                    />
                    <span data-testid={ `${i1}-card-name` }>
                      { recipe.strDrink }
                    </span>
                  </div>
                ))
            )}
          { drinkIngredient.length === 1
            ? (<Redirect to={ `/drinks/${drinkIngredient[0].idDrink}` } />)
            : (
              drinkIngredient
                .filter((recipe, i) => i <= number)
                .map((recipe, i1) => (
                  <div
                    className="individualCardC"
                    key={ i1 }
                    data-testid={ `${i1}-recipe-card` }
                  >
                    <img
                      className="imgFandD"
                      src={ recipe.strDrinkThumb }
                      alt={ recipe.strDrink }
                      data-testid={ `${i1}-card-img` }
                    />
                    <span data-testid={ `${i1}-card-name` }>
                      { recipe.strDrink }
                    </span>
                  </div>
                ))
            )}
        </div>
      </div>
    );
  }
}
ComponentDrinks.propTypes = {
  nameDrink: PropTypes.instanceOf(Object).isRequired,
  firstLetterDrinks: PropTypes.instanceOf(Object).isRequired,
  drinkIngredient: PropTypes.instanceOf(Object).isRequired,
};
const mapStateToProps = (state) => ({
  nameDrink: state.foodsReducer.nameDrink.drinks,
  firstLetterDrinks: state.foodsReducer.firstLetterDrinks.drinks,
  drinkIngredient: state.foodsReducer.drinkIngredient.drinks,
});

export default connect(mapStateToProps)(ComponentDrinks);
