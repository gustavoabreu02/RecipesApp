import React from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

class DoneRecipes extends React.Component {
  render() {
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
        {/* o index é um link e estava entre ${} */}
        <img
          data-testid="index-horizontal-image"
          src=""
          alt=""
        />
        {/* o index é um link e estava entre ${}, nome genérico para não quebrar o requisito */}
        <p data-testid="index-horizontal-top-text">{recipeCategory}</p>
        {/* botão de compartilhar */}
        <button
          data-testid="index-horizontal-share-btn" /* o index é um link e estava entre ${} */
          type="button"
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="lupa" />
        </button>
        {/* o index é um link e estava entre ${}, nome genérico para não quebrar o requisito */}
        <h3 data-testid="index-horizontal-name">{recipeName}</h3>
        {/* o index é um link e estava entre ${}, nome genérico para não quebrar o requisito */}
        <p data-testid="index-horizontal-done-date">{finishRecipeData}</p>
        {/* o index e tagName são links e estavam entre ${}, nome genérico para não quebrar o requisito */}
        <p data-testid="index-tagName-horizontal-tag">{finishRecipeData}</p>
      </div>
    );
  }
}
export default DoneRecipes;
