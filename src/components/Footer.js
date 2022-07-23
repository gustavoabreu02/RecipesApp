import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

class Footer extends React.Component {
  render() {
    return (
      <footer data-testid="footer">

        <Link to="/drinks">
          <button
            data-testid="drinks-bottom-btn"
            type="button"
            src={ drinkIcon }
          >
            <img src={ drinkIcon } alt="perfil" />
          </button>
        </Link>
        <Link to="/foods">
          <button
            data-testid="food-bottom-btn"
            type="button"
            src={ mealIcon }
          >
            <img src={ mealIcon } alt="perfil" />
          </button>
        </Link>
      </footer>
    );
  }
}

export default connect()(Footer);
