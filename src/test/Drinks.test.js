import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouterAndRedux';

describe('Testa a Header', () => {
  beforeEach(() => {
    const email = 'email@gmail.com';
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    renderWithRouter(<App />, {}, '/drinks');
  });

  test('Testa a tela drinks', () => {
    const title = screen.getByRole('heading', { name: /Drinks/i });
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');

    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileBtn).toHaveAttribute('src', 'profileIcon.svg');
    expect(searchBtn).toHaveAttribute('src', 'searchIcon.svg');
  });
});
