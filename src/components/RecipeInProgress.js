import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DrinksInProgress from '../pages/DrinksInProgress';
import FoodsInProgress from '../pages/FoodsInProgress';

class RecipeInProgress extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        { match.path.includes('/foods') ? (
          <FoodsInProgress { ...this.props } />
        ) : <DrinksInProgress { ...this.props } /> }
      </div>
    );
  }
}

RecipeInProgress.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect()(RecipeInProgress);
