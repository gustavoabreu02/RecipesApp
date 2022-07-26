import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouterAndRedux';

let globalHistory;

describe('Teste o componente <Login.js />', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />, {}, '/');
    globalHistory = history;
  });
  test('Testa todos os elementos que devem respeitar os atributos descritos', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordinput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button', { name: /enter/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordinput).toBeInTheDocument();
    expect(buttonLogin).toBeInTheDocument();
  });

  test('Testa se os Inputs são validos', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordinput = screen.getByTestId('password-input');
    const buttonLogin = screen.getByRole('button', { name: /enter/i });

    expect(buttonLogin).toBeDisabled();

    userEvent.type(passwordinput, '1234567');
    userEvent.type(emailInput, 'email@mail.com');

    expect(buttonLogin).toBeInTheDocument();

    userEvent.click(buttonLogin);

    expect(globalHistory.location.pathname).toBe('/foods');
  });
});
