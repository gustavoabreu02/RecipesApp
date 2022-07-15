import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

import renderWithRouter from './renderWithRouter';

describe('Teste o componente <Login.js />', () => {
  test('Testa todos os elementos que devem respeitar os atributos descritos', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    const passwordinput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordinput).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  test('Testa se os Inputs são validos', async () => {
  });

  const { history } = renderWithRouter(<App />);

  const emailInput = screen.getByTestId('email-input');
  const passwordinput = screen.getByTestId('password-input');
  const buttonLogin = screen.getByRole('button', { name: /enter/i });

  expect(buttonLogin).toBeDisabled();

  userEvent.type(passwordinput, 'grupo11');
  userEvent.type(emailInput, 'grupo11@hotmail.com');

  expect(buttonLogin).not.toBeDisabled();

  userEvent.click(buttonLogin);

 expect(history.location.pathname).toBe('/foods');
});
