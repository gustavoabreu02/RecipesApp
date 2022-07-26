import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Foods extends React.Component {
  render() {
    const {
      foodsIngredients,
      foodsName,
      foodsFirstLetter,
    } = this.props;
    const number = 11;
    return (
      <div className="body color">
        <Header title="Foods" showIcon="true" { ...this.props } />
        <div className="cardContainer">
          { foodsIngredients.length === 1
            ? (<Redirect to={ `/foods/${foodsIngredients[0].idMeal}` } />)
            : (
              foodsIngredients.filter((recipe, i) => i <= number).map((recipe, i1) => (
                <div
                  className="individualCardC"
                  data-testid={ `${i1}-recipe-card` }
                  key={ recipe.idMeal }
                >
                  <img
                    className="imgFandD"
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    data-testid={ `${i1}-card-img` }
                  />
                  <span data-testid={ `${i1}-card-name` }>
                    { recipe.strMeal }
                  </span>
                </div>
              ))
            )}
          { foodsName.length === 1
            ? (<Redirect to={ `/foods/${foodsName[0].idMeal}` } />)
            : (
              foodsName.filter((recipe, i) => i <= number).map((recipe, i2) => (
                <div
                  className="individualCardC"
                  data-testid={ `${i2}-recipe-card` }
                  key={ recipe.idMeal }
                >
                  <img
                    className="imgFandD"
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    data-testid={ `${i2}-card-img` }
                  />
                  <span data-testid={ `${i2}-card-name` }>
                    { recipe.strMeal }
                  </span>
                </div>
              ))
            )}
          { foodsFirstLetter.length === 1
            ? (<Redirect to={ `/foods/${foodsFirstLetter[0].idMeal}` } />)
            : (
              foodsFirstLetter.filter((recipe, i) => i <= number).map((recipe, i3) => (
                <div
                  className="individualCardC"
                  data-testid={ `${i3}-recipe-card` }
                  key={ recipe.idMeal }
                >
                  <img
                    className="imgFandD"
                    src={ recipe.strMealThumb }
                    alt={ recipe.strMeal }
                    data-testid={ `${i3}-card-img` }
                  />
                  <span data-testid={ `${i3}-card-name` }>
                    { recipe.strMeal }
                  </span>
                </div>
              ))
            )}
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
};

const mapStateToProps = (state) => ({
  foodsIngredients: state.foodsReducer.ingredient.meals,
  foodsName: state.foodsReducer.name.meals,
  foodsFirstLetter: state.foodsReducer.firstLetter.meals,
});

export default connect(mapStateToProps)(Foods);

// refazer css
