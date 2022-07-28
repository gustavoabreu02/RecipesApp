import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ComponentDrinks from './ComponentDrinks';
import ComponentFoods from './ComponentFoods';
/* import Header from '../components/Header'; */

class Recipes extends React.Component {
  render() {
    const { type } = this.props;
    return (
      <div>
        { type === 'drinks' ? <ComponentDrinks /> : <ComponentFoods /> }
      </div>
    );
  }
}
Recipes.propTypes = {
  type: PropTypes.string.isRequired,
};

export default connect()(Recipes);
