import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

class Profile extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { history } = this.props;
    localStorage.clear();
    history.push('/');
  }

  render() {
    return (
      <div>
        <Header title="Profile" />
        <span data-testid="profile-email">
          { JSON.parse(localStorage.getItem('user'))?.email || ''}
        </span>
        <Link to="/done-recipes">
          <button data-testid="profile-done-btn" type="button">Done Recipes</button>
        </Link>
        <Link to="/favorite-recipes">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ this.handleClick }
        >
          Logout
        </button>
        <Footer { ...this.props } />
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
