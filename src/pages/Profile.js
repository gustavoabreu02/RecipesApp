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
      <div className="body color">
        <div className="headerContainerTwo">
          <Header title="Profile" />
        </div>
        <div className="profileContainer">
          <span data-testid="profile-email">
            { JSON.parse(localStorage.getItem('user'))?.email || ''}
          </span>
          <div className="btnContainer">
            <Link to="/done-recipes">
              <button
                data-testid="profile-done-btn"
                type="button"
                className="sBtn"
              >
                Done Recipes
              </button>
            </Link>
            <Link to="/favorite-recipes">
              <button
                data-testid="profile-favorite-btn"
                type="button"
                className="sBtn"
              >
                Favorite Recipes
              </button>
            </Link>
            <button
              data-testid="profile-logout-btn"
              type="button"
              onClick={ this.handleClick }
              className="sBtn"
            >
              Logout
            </button>
          </div>
        </div>
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

// css semi pronto
