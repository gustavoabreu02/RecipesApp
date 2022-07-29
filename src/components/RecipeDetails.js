import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DetailsFoods from './DetailsFoods';
import DetailsDrinks from './DetailsDrinks';
// import blackHeartIcon from '../images/blackHeartIcon.svg'; // import dos corações para lógica - cheio
// import whiteHeartIcon from '../images/whiteHeartIcon.svg'; // import dos corações para lógica - vazio

class RecipeDetails extends React.Component {
  state = {
    data: [],
  }

  pause = (event) => {
    event.target.pauseVideo();
  }

  componentDidMount = async () => {
    const { match, location } = this.props;
    if (location.pathname.includes('/foods')) {
      await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((response) => response.json())
        .then((data) => this.setState({ data: data.meals[0] }));
    }
    if (location.pathname.includes('/drinks')) {
      await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${match.params.id}`)
        .then((response) => response.json())
        .then((data) => this.setState({ data: data.drinks[0] }));
    }
  };

  render() {
    const { data } = this.state;
    const { location } = this.props;
    return (
      <div>
        { location.pathname.includes('/foods') ? (
          <DetailsFoods data={ data } />
        ) : <DetailsDrinks data={ data } /> }
      </div>
    );
  }
}

RecipeDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

};

export default connect()(RecipeDetails);
