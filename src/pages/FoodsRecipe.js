import React from 'react';
import RecipeDetails from '../components/RecipeDetails';

class FoodsRecipe extends React.Component {
  render() {
    return (
      <>
        <RecipeDetails />
        <button
          className="startRecipeBtn"
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      </>
    );
  }
}

export default FoodsRecipe;
