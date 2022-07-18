import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

class Header extends React.Component {
  render() {
    const { title, showIcon } = this.props;
    return (
      <header>
        <Link to="/profile">
          <button
            data-testid="profile-top-btn"
            type="button"
          >
            <img
              src={ profileIcon }
              alt="perfil"
            />
          </button>
        </Link>
        <h1 data-testid="page-title">
          { title }
        </h1>
        {showIcon
        && <input
          data-testid="search-top-btn"
          type="image"
          src={ searchIcon }
          alt="lupa"
        />}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showIcon: PropTypes.bool.isRequired,
};

export default Header;
