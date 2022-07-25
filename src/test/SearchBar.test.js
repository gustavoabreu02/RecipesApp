import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouterAndRedux';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch);
};

const idSearchInput = 'search-input';
const idSearchBtn = 'exec-search-btn';
const lupa = 'search-top-btn';

describe('SearchBar', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  test('Teste se há os elementos do Search Bar', () => {
    const INITIAL_STATE = {
      ingredient: { meals: [] },
      name: { meals: [] },
      firstLetter: { meals: [] },
      searchValue: '',
      drinkIngredient: { drinks: [] },
      nameDrink: { drinks: [] },
      firstLetterDrinks: { drinks: [] },
    };
    renderWithRouter(<App />, { foodsReducer: INITIAL_STATE }, '/drinks');
    const searchBtn = screen.getByTestId(lupa);
    userEvent.click(searchBtn);

    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const first = screen.getByTestId('first-letter-search-radio');

    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(first).toBeInTheDocument();
  });

  test.only('Teste se busca um elemento name.', async () => {
    const INITIAL_STATE = {
      ingredient: { meals: [] },
      name: { meals: [] },
      firstLetter: { meals: [] },
      searchValue: '',
      drinkIngredient: { drinks: [] },
      nameDrink: { drinks: [] },
      firstLetterDrinks: { drinks: [] },
    };
    renderWithRouter(<App />, { foodsReducer: INITIAL_STATE }, '/foods');
    const searchBtn = screen.getByTestId(lupa);

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();
    userEvent.type(screen.queryByTestId(idSearchInput), 'soup');

    const filterName = screen.queryByTestId('name-search-radio');
    userEvent.click(filterName);

    const search = screen.queryByTestId(idSearchBtn);
    userEvent.click(search);
    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
  });
  test('Teste se busca um elemento ingredient', () => {
    const INITIAL_STATE = {
      ingredient: { meals: [] },
      name: { meals: [] },
      firstLetter: { meals: [] },
      searchValue: '',
      drinkIngredient: { drinks: [] },
      nameDrink: { drinks: [] },
      firstLetterDrinks: { drinks: [] },
    };
    renderWithRouter(<App />, { foodsReducer: INITIAL_STATE }, '/foods');
    const searchBtn = screen.getByTestId(lupa);

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();
    userEvent.type(screen.queryByTestId(idSearchInput), 'rice');

    const filterName = screen.queryByTestId('ingredient-search-radio');
    userEvent.click(filterName);

    const search = screen.queryByTestId(idSearchBtn);
    userEvent.click(search);
  });
  test('Teste se busca um elemento first letter', () => {
    const INITIAL_STATE = {
      ingredient: { meals: [] },
      name: { meals: [] },
      firstLetter: { meals: [] },
      searchValue: '',
      drinkIngredient: { drinks: [] },
      nameDrink: { drinks: [] },
      firstLetterDrinks: { drinks: [] },
    };
    renderWithRouter(<App />, { foodsReducer: INITIAL_STATE }, '/foods');
    const searchBtn = screen.getByTestId(lupa);

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();
    userEvent.type(screen.queryByTestId(idSearchInput), 'c');

    const filterFirstLetter = screen.queryByTestId('first-letter-search-radio');
    userEvent.click(filterFirstLetter);

    const search = screen.queryByTestId(idSearchBtn);
    userEvent.click(search);
  });
});
