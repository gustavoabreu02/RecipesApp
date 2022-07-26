import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Login';
import renderWithRouter from '../renderWithRouterAndRedux';
import App from '../App';

let globalHistory;

describe('Teste o componente <Profile.js />',
  () => {
    beforeEach(() => {
      const email = '';
      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('mealsToken', 1);
      localStorage.setItem('cocktailsToken', 1);
      const { history } = renderWithRouter(<App />, {}, '/profile');
      globalHistory = history;
    });
    test(
      'Implemente os elementos da tela de perfil respeitando os atributos descrito',
      () => {
        renderWithRouter(<Profile />);
        const profileEmail = screen.getByTestId('profile-email');

        expect(profileEmail).toHaveAttribute(null);
      },
    );
  });

describe('Teste o componente <Profile.js />',
  () => {
    beforeEach(() => {
      const email = 'email@gmail.com';
      localStorage.setItem('user', JSON.stringify({ email }));
      localStorage.setItem('mealsToken', 1);
      localStorage.setItem('cocktailsToken', 1);
      const { history } = renderWithRouter(<App />, {}, '/profile');
      globalHistory = history;
    });

    test(
      'Implemente os elementos da tela de perfil respeitando os atributos descrito',
      () => {
        renderWithRouter(<Profile />);
        const title = screen.getByRole('heading', { name: /Profile/i });
        const profileEmail = screen.getByTestId('profile-email');
        const profileDoneBtn = screen.getByTestId('profile-done-btn');
        const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
        const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

        expect(profileEmail).toBeInTheDocument();
        expect(profileDoneBtn).toBeInTheDocument();
        expect(profileFavoriteBtn).toBeInTheDocument();
        expect(profileLogoutBtn).toBeInTheDocument();
        expect(title).toBeInTheDocument();
      },
    );

    test(
      'Implemente 3 botões ',
      () => {
        const profileDoneBtn = screen.getByRole('button', { name: /Done Recipes/i });
        const profileFavoriteBtn = screen.getByRole('button',
          { name: /Favorite Recipes/i });
        const profileLogoutBtn = screen.getByRole('button', { name: /Logout/i });

        expect(profileDoneBtn).toBeInTheDocument();
        expect(profileFavoriteBtn).toBeInTheDocument();
        expect(profileLogoutBtn).toBeInTheDocument();
      },
    );

    test(
      'Redirecione o usuário ao clicar no botão de "Done Recipes', () => {
        const profileDoneBtn = screen.getByRole('button', { name: /Done Recipes/i });
        userEvent.click(profileDoneBtn);

        expect(globalHistory.location.pathname).toBe('/done-recipes');
      },
    );
    test(
      'Redirecione o usuário ao clicar no botão de "Favorite Recipes"', () => {
        const profileFavoriteBtn = screen.getByRole('button',
          { name: /Favorite Recipes/i });
        userEvent.click(profileFavoriteBtn);

        expect(globalHistory.location.pathname).toBe('/favorite-recipes');
      },
    );
    test(
      'Redirecione o usuário ao clicar no botão de "Logout"', () => {
        const profileLogoutBtn = screen.getByRole('button', {
          name: /logout/i,
        });
        userEvent.click(profileLogoutBtn);

        expect(globalHistory.location.pathname).toBe('/');
      },
    );
  });
