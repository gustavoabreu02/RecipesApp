import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { changePage } from '../redux/Actions/actions';

class Footer extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 'foods',
    };
  }

  render() {
    console.log(this.props);
    return (
      <footer data-testid="footer">
        <button
          data-testid="drinks-bottom-btn"
          type="button"
          src={ drinkIcon }
          onClick={ () => {
            this.setState({
              page: 'drinks',
            }, () => {
              const { dispatch, history } = this.props;
              const { page } = this.state;
              dispatch(changePage(page));
              history.push('/drinks');
            });
          } }
        >
          <img src={ drinkIcon } alt="perfil" />
        </button>

        <button
          data-testid="food-bottom-btn"
          type="button"
          src={ mealIcon }
          onClick={ () => {
            this.setState({
              page: 'foods',
            }, () => {
              const { page } = this.state;
              const { dispatch, history } = this.props;
              dispatch(changePage(page));
              history.push('/foods');
            });
          } }
        >
          <img src={ mealIcon } alt="perfil" />
        </button>

      </footer>
    );
  }
}
Footer.defaultProps = {
  history: { push: () => ('a') },
};

Footer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

export default connect()(Footer);
