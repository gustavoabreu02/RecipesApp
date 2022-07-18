import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Link to="/profile">
          <input type="image" src={ profileIcon } alt="boneco" />
        </Link>
      </div>
    );
  }
}

export default Header;
