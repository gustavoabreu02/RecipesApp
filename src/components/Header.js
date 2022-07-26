import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { getSearchValue } from '../redux/Actions/actions';

class Header extends React.Component {
  state = {
    showSearch: false,
    searchValue: '',
  }

  showInput = () => {
    const { showSearch } = this.state;
    this.setState({ showSearch: !showSearch });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    const { dispatch } = this.props;
    this.setState({
      [name]: value,
    }, () => {
      const { searchValue } = this.state;
      dispatch(getSearchValue(searchValue));
    });
  }

  render() {
    const { title, showIcon } = this.props;
    const { showSearch, searchValue } = this.state;
    return (
      <header className="headerContainer">
        <Link to="/profile">
          <button
            className="btnImg pIcon"
            data-testid="profile-top-btn"
            type="button"
            src={ profileIcon }
          >
            <img src={ profileIcon } alt="perfil" />
          </button>
        </Link>
        <h1 data-testid="page-title">
          { title }
        </h1>
        {showIcon
        && (
          <button
            className="btnImg"
            data-testid="search-top-btn"
            type="button"
            src={ searchIcon }
            onClick={ this.showInput }
          >
            <img src={ searchIcon } alt="lupa" />
          </button>
        )}
        {showSearch
        && (
          <div>
            <input
              className="sInput"
              data-testid="search-input"
              type="text"
              value={ searchValue }
              onChange={ this.handleChange }
              name="searchValue"
            />
            <SearchBar { ...this.props } />
          </div>
        )}
      </header>
    );
  }
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showIcon: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Header);

// css pronto
