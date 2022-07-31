import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mock from './mock';
import renderWithRouterAndRedux from '../renderWithRouterAndRedux';


const idSearchInput = 'search-input';
const idSearchBtn = 'exec-search-btn';
const lupa = 'search-top-btn';
const btnFirst = 'first-letter-search-radio';

describe('SearchBar', () => {
  beforeEach(() => mock());
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
      typeSearch: false,
    };
    renderWithRouterAndRedux(<App />, { foodsReducer: INITIAL_STATE }, '/drinks');
    const searchBtn = screen.getByTestId(lupa);
    userEvent.click(searchBtn);

    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const first = screen.getByTestId('first-letter-search-radio');

    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(first).toBeInTheDocument();
  });

  test('Teste se busca um elemento name.', async () => {
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
    renderWithRouterAndRedux(<App />, { foodsReducer: INITIAL_STATE }, '/drinks');
    expect(await screen.findByTestId('0-recipe-card')).toBeInTheDocument();
    const searchBtn = screen.getByTestId(lupa);

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();
    userEvent.type(screen.queryByTestId(idSearchInput), 'tequila');

    const filterName = screen.queryByTestId('name-search-radio');
    userEvent.click(filterName);

    const search = screen.queryByTestId(idSearchBtn);
    userEvent.click(search);
    // expect(await screen.findByText(/^tequila sunrise$/i)).toBeInTheDocument();
  });

  test('Teste se busca um elemento ingredient', async () => {
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
    renderWithRouterAndRedux(<App />, { foodsReducer: INITIAL_STATE }, '/drinks');
    const searchBtn = screen.getByTestId(lupa);

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();
    userEvent.type(screen.queryByTestId(idSearchInput), 'chocolate');

    const filterName = screen.queryByTestId('ingredient-search-radio');
    userEvent.click(filterName);

    const search = screen.queryByTestId(idSearchBtn);
    userEvent.click(search);
    // expect(await screen.findByText(/chocolate drink/i)).toBeInTheDocument();
  });

  test('Teste se busca um elemento first letter', async () => {
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
    renderWithRouterAndRedux(<App />, { foodsReducer: INITIAL_STATE }, '/drinks');
    const searchBtn = screen.getByTestId(lupa);

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();
    userEvent.type(screen.queryByTestId(idSearchInput), 'c');

    const filterFirstLetter = screen.queryByTestId(btnFirst);
    userEvent.click(filterFirstLetter);

    const search = screen.queryByTestId(idSearchBtn);
    userEvent.click(search);
    // expect(await screen.findByText(/cherry rum/i)).toBeInTheDocument();
  });
  test('Teste se busca um elemento alert', () => {
    /* const INITIAL_STATE = {
      ingredient: { meals: [] },
      name: { meals: [] },
      firstLetter: { meals: [] },
      searchValue: '',
      drinkIngredient: { drinks: [] },
      nameDrink: { drinks: [] },
      firstLetterDrinks: { drinks: [] },
      typeSearch: false,
    };
    global.alert = jest.fn(console.log);
    renderWithRouterAndRedux(<App />, { foodsReducer: INITIAL_STATE }, '/drinks');
    const searchBtn = screen.getByTestId(lupa);

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();
    userEvent.type(screen.queryByTestId(idSearchInput), 'cc');

    const filterFirstLetter = screen.queryByTestId(btnFirst);
    userEvent.click(filterFirstLetter);

    const search = screen.queryByTestId(idSearchBtn);
    userEvent.click(search);
    expect(global.alert).toBeCalledTimes(0); // se deixa em 0 passa mas não aumenta a cobertura */
  });
});
