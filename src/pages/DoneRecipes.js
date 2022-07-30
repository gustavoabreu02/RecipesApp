import React from 'react';
import Header from '../components/Header';
// import shareIcon from '../images/shareIcon.svg';

// const copy = require('clipboard-copy');

class DoneRecipes extends React.Component {
  /* state = {
    buttonFavorite: true,
    copied: false,
  }.this.state;

  copy = (type, id) => {
    copy(`http://localhost:3000/${type}/${id}`);
    this.setState({
      copied: true,
    });
  } */
  render() {
    // const { } = this.state;
    return (
      <div>
        <Header title="Done Recipes" />
        <button
          data-testid="filter-by-all-btn"
          type="button"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
        >
          Drinks
        </button>
        <img
          data-testid="index-horizontal-image"
          src=""
          alt=""
        />
        <p data-testid="index-horizontal-top-text">{recipeCategory}</p>
        <button
          data-testid="index-horizontal-share-btn"
          type="button"
          src={ shareIcon }
          // onClick={ () => this.copy('foods', data.idMeal) }
        >
          <img src={ shareIcon } alt="lupa" />
        </button>
        <h3 data-testid="index-horizontal-name">{recipeName}</h3>
        <p data-testid="index-horizontal-done-date">{finishRecipeData}</p>
        <p data-testid="index-tagName-horizontal-tag">{finishRecipeData}</p>
      </div>
    );
  }
}

export default DoneRecipes;
