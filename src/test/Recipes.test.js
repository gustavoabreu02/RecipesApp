import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouterAndRedux';

describe('Testa a Recipes', () => {
  test('Testa se há os itens no componente', () => {
    const INITIAL_STATE = {
      ingredient: { meals: [] },
      name: { meals: [] },
      firstLetter: { meals: [] },
      searchValue: '',
      drinkIngredient: { drinks: [] },
      nameDrink: { drinks: [] },
      firstLetterDrinks: { drinks: [] },
      typeSearch: false,
    };
    renderWithRouter(<App />, { foodsReducer: INITIAL_STATE }, '/recipes');
  });
});
