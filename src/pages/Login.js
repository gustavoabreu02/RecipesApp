import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { getUserEmail } from '../actions';

const INICIAL_STATE = {
  isSaveButtonDisabled: true,
  email: '',
  password: '',
};

class Login extends React.Component {
    state = INICIAL_STATE

    handleChange = ({ target }) => {
      const { name, value } = target;
      this.setState({ [name]: value }, () => this.filterLogin());
    }

    filterLogin = () => {
      const NoMagicNumber = 7;
      const { email, password } = this.state;
      const emailFilter = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (password.length >= NoMagicNumber && emailFilter.test(email)) {
        this.setState({ isSaveButtonDisabled: false });
      }
    }

    handleClick = (event) => {
      event.preventDefault();
      const { user } = this.props;
      const { email } = this.state;
      user(email);
    }

    render() {
      const { email, password, isSaveButtonDisabled } = this.state;
      return (
        <form>
          <fieldset>
            <label htmlFor="email">
              Email:
              <input
                value={ email }
                id="email"
                type="email"
                name="email"
                data-testid="email-input"
                onChange={ this.handleChange }
              />
            </label>
            Senha:
            <label htmlFor="password">
              <input
                value={ password }
                id="password"
                type="password"
                name="password"
                data-testid="password-input"
                onChange={ this.handleChange }
              />
            </label>
            <Link to="/foods">
              <button
                id="login-submit-btn"
                type="submit"
                name="login-submit-btn"
                data-testid="login-submit-btn"
                disabled={ isSaveButtonDisabled }
                onChange={ this.handleClick }
              >
                Enter
              </button>
            </Link>
          </fieldset>
        </form>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  user: (email) => dispatch(getUserEmail(email)),
});

Login.propTypes = {
  user: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,

};

export default connect(null, mapDispatchToProps)(Login);
