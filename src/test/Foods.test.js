import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouterAndRedux';
import FoodsRecipe from '../pages/FoodsRecipe';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(fetch);
};

describe('Testa a Header o foods', () => {
  beforeEach(() => {
    mockFetch();
    const email = 'email@gmail.com';
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    renderWithRouter(<App />, {}, '/foods');
  //  globalHistory = history;
  });

  test('Testa a tela foods', () => {
    const title = screen.getByRole('heading', { name: /Foods/i });
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchBtn);
    const searchBar = screen.getByTestId('search-input');

    expect(searchBar).toBeInTheDocument();

    userEvent.click(screen.getByTestId('search-top-btn'));

    expect(searchBar).not.toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileBtn).toHaveAttribute('src', 'profileIcon.svg');
    expect(searchBtn).toHaveAttribute('src', 'searchIcon.svg');
  });

  test('Testa a tela foods recipe', () => {
    renderWithRouter(<FoodsRecipe />);
    expect(screen.getByText(/Foods Recipe/i)).toBeInTheDocument();
  });
});
