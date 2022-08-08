import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

class DoneRecipes extends React.Component {
  state = {
    copied: false,
    data: JSON.parse(localStorage.getItem('doneRecipes')),
  }

  copy = (type, id) => {
    copy(`http://localhost:3000/${type}/${id}`);
    this.setState({
      copied: true,

    });
  }

  render() {
    const { copied, data } = this.state;
    const dataInitial = JSON.parse(localStorage.getItem('doneRecipes'));
    console.log(data);
    return (
      <div>
        <Header title="Done Recipes" showIcon="a" />
        <button
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => this.setState({
            data: dataInitial,
          }) }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ () => this.setState(() => ({
            data: dataInitial.filter((recipe) => recipe.alcoholicOrNot === ''),
          })) }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => this.setState(() => ({
            data: dataInitial.filter((recipe) => recipe.alcoholicOrNot.length > 1),
          })) }
        >
          Drinks
        </button>
        { data
          .map((recipe, i) => (
            <div key={ i }>
              <input
                type="image"
                src={ recipe.image }
                alt={ recipe.name }
                onClick={ () => {
                  const { history } = this.props;
                  if (recipe.alcoholicOrNot.length > 1) {
                    return history.push(`/drinks/${recipe.id}`);
                  }
                  return history.push(`/foods/${recipe.id}`);
                } }
                data-testid={ `${i}-horizontal-image` }
              />
              <p
                data-testid={ `${i}-horizontal-top-text` }
              >
                { recipe.alcoholicOrNot.length > 1 ? (
                  recipe.alcoholicOrNot
                ) : (
                  `${recipe.nationality} - ${recipe.category}`
                ) }

              </p>
              <button
                data-testid={ `${i}-horizontal-share-btn` }
                type="button"
                src={ shareIcon }
                onClick={ () => (recipe.type === 'Drink' ? (
                  this.copy('drinks', recipe.id)
                ) : this.copy('foods', recipe.id)) }
              >
                <img src={ shareIcon } alt="lupa" />
              </button>
              { copied ? (
                <p>Link copied!</p>
              ) : '' }
              <Link
                to={ recipe.alcoholicOrNot.length > 1 ? (
                  `/drinks/${recipe.id}`
                ) : (
                  `/foods/${recipe.id}`
                ) }
              >
                <h3 data-testid={ `${i}-horizontal-name` }>{ recipe.name }</h3>
              </Link>
              <p data-testid={ `${i}-horizontal-done-date` }>{ recipe.doneDate }</p>
              { recipe.tags.map((tag, index) => (
                <p
                  key={ index }
                  data-testid={ `${i}-${tag}-horizontal-tag` }
                >
                  { tag }

                </p>
              )) }
            </div>
          )) }
      </div>
    );
  }
}

DoneRecipes.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default DoneRecipes;
