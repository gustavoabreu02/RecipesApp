/* import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouterAndRedux';
import App from '../App'; */
import fetch from '../../cypress/mocks/fetch';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch);
};

/* const pathToPage = () => {
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
  renderWithRouter(<App />, { foodsReducer: INITIAL_STATE }, '/foods');
  const searchBtn = screen.getByTestId('search-top-btn');
  userEvent.click(searchBtn);

  expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();
  userEvent.type(screen.queryByTestId(idSearchInput), 'big mac');

  const filterName = screen.queryByTestId('name-search-radio');
  userEvent.click(filterName);

  const search = screen.queryByTestId('exec-search-btn');
  userEvent.click(search);
  globalHistory.push('/foods/53013');
  expect(globalHistory.location.pathname).toBe('/foods/53013');
}; */

describe('DetailsFoods', () => {
  beforeEach(mockFetch, pathToPage);
  afterEach(() => jest.clearAllMocks());

  test('Teste se há os elementos do Search Bar', () => {
    /*  const headImg = screen.findByTestId('recipe-photo');
    const title = screen.findByTestId('recipe-title');
    const shareIconBtn = screen.findByTestId('share-btn');
    const favoriteIconBtn = screen.findByTestId('favorite-btn');
    const category = screen.findByTestId('recipe-category');
    const ingredientMeasure = screen.findByTestId('0-ingredient-name-and-measure');
    const instruction = screen.findByTestId('instructions');
    const videoCard = screen.findByTestId('video');
    const recomendationCard = screen.findByTestId('0-recomendation-card');
    const imgCard = screen.findByTestId('0-card-img');
    const nameCard = screen.findByTestId('0-card-name');
    const titleCard = screen.findByTestId('0-recomendation-title');
    const redirectLink = screen.findByTestId('start-recipe-btn');

    expect(headImg).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(shareIconBtn).toBeInTheDocument();
    expect(favoriteIconBtn).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(ingredientMeasure).toBeInTheDocument();
    expect(instruction).toBeInTheDocument();
    expect(videoCard).toBeInTheDocument();
    expect(recomendationCard).toBeInTheDocument();
    expect(imgCard).toBeInTheDocument();
    expect(nameCard).toBeInTheDocument();
    expect(titleCard).toBeInTheDocument();
    expect(redirectLink).toBeInTheDocument(); */
  });
});
