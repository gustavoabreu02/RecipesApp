import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouterAndRedux';
import fetch from '../../cypress/mocks/fetch';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(fetch),
    }));
};

describe('Testa a Header:', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  test('Um elemento que exiba o email do usuário que fez login.', () => {
    renderWithRouter(<App />, {}, '/drinks');
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

  test('Teste se busca um elemento na barra de pesquisa.', async () => {
    renderWithRouter(<App />, {}, '/drinks');
    const searchBtn = screen.getByTestId('search-top-btn');
    const searchInput = screen.queryByTestId('search-input');
    const filterName = screen.queryByTestId('name-search-radio');
    const search = screen.queryByTestId('exec-search-btn');

    userEvent.click(searchBtn);
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchBtn, 'gin');
    userEvent.click(filterName);
    userEvent.click(search);
    expect(await screen.getByText(/pink gin/i)).toBeInTheDocument();
  });

  test(' Teste se cada página recebe seu próprio título `Drinks`', () => {
    renderWithRouter(<App />, {}, '/drinks');
    const pageTitle = screen.queryByTestId('page-title');
    const textTitle = screen.queryByText(/Drinks/i);
    expect(pageTitle).toBeInTheDocument();
    expect(textTitle).toBeInTheDocument();
  });

  test(' Teste se cada página recebe seu próprio título `Foods`', () => {
    renderWithRouter(<App />, {}, '/foods');
    const pageTitle = screen.queryByTestId('page-title');
    const textTitle = screen.queryByText(/Foods/i);
    expect(pageTitle).toBeInTheDocument();
    expect(textTitle).toBeInTheDocument();
  });
});
