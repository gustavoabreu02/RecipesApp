import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouterAndRedux';
import App from '../App';
import fetch from '../../cypress/mocks/fetch';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
      status: 200,
      ok: true,
      json: () => Promise.resolve(fetch),
    }));
};

describe('SearchBar', () => {
  beforeEach(mockFetch);
  afterEach(() => jest.clearAllMocks());

  test('Elementos do Search Bar', () => {
    renderWithRouter(<App />, {}, '/foods');
    const ingredient = screen.getByTestId('ingredient-search-radio');
    const name = screen.getByTestId('name-search-radio');
    const first = screen.getByTestId('first-letter-search-radio');

    expect(ingredient).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(first).toBeInTheDocument();
  });
});
