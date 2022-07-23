import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouterAndRedux';

describe('Testa a Header:', () => {
  test('Um elemento que exiba o email do usuário que fez login.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const profileBtn = screen.getByTestId('profile-top-btn');
    const searchBtn = screen.getByTestId('search-top-btn');
    const searchInput = screen.queryByTestId('search-input');

    expect(profileBtn).toBeInTheDocument();
    expect(searchBtn).toBeInTheDocument();
    expect(profileBtn).toHaveAttribute('src', 'profileIcon.svg');
    expect(searchBtn).toHaveAttribute('src', 'searchIcon.svg');
    expect(searchInput).not.toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(searchInput).toBeInTheDocument();

    userEvent.click(searchBtn);
    expect(searchInput).not.toBeInTheDocument();
  });

  test(' Teste se cada página recebe seu próprio título', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const pageTitle = screen.queryByTestId('page-title');
    const textTitle = screen.getByText(/Drinks/i);
    expect(pageTitle).toBeInTheDocument();
    expect(textTitle).toContain();
  });
});
