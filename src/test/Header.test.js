import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouterAndRedux';
import fetch from '../../cypress/mocks/fetch';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch);
};

describe('Testa a Header:', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  test('Um elemento que exiba o email do usuário que fez login.', () => {
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
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    const idSearchInput = 'search-input';

    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileBtn).toHaveAttribute('src', 'profileIcon.svg');
    expect(searchBtn).toHaveAttribute('src', 'searchIcon.svg');
    expect(screen.queryByTestId(idSearchInput)).not.toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).not.toBeInTheDocument();
  });

  test('Teste se busca um elemento na barra de pesquisa.', async () => {
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
    renderWithRouter(<App />, { foodsReducer: INITIAL_STATE }, '/drinks');
    const searchBtn = screen.getByTestId('search-top-btn');
    const idSearchInput = 'search-input';

    userEvent.click(searchBtn);
    expect(screen.queryByTestId(idSearchInput)).toBeInTheDocument();
    userEvent.type(screen.queryByTestId(idSearchInput), 'gin');

    const filterName = screen.queryByTestId('name-search-radio');
    userEvent.click(filterName);

    const search = screen.queryByTestId('exec-search-btn');
    userEvent.click(search);
    // expect(await screen.findByTestId('2-recipe-card')).toBeInTheDocument();
  });

  test(' Teste se cada página recebe seu próprio título `Drinks`', () => {
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
    const pageTitle = screen.queryByTestId('page-title');
    const textTitle = screen.queryByText(/Drinks/i);
    expect(pageTitle).toBeInTheDocument();
    expect(textTitle).toBeInTheDocument();
  });

  test(' Teste se cada página recebe seu próprio título `Foods`', () => {
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
    const pageTitle = screen.queryByTestId('page-title');
    const textTitle = screen.queryByText(/Foods/i);
    expect(pageTitle).toBeInTheDocument();
    expect(textTitle).toBeInTheDocument();
  });
});
