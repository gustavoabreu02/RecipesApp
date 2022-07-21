import React from 'react';
import RecipeDetails from '../components/RecipeDetails';

class DrinksRecipe extends React.Component {
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

export default DrinksRecipe;
