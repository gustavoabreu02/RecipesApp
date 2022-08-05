import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg'; // import dos corações para lógica - cheio
// import whiteHeartIcon from '../images/whiteHeartIcon.svg'; // import dos corações para lógica - vazio

class DrinksInProgress extends React.Component {
  state = {
    data: [],
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
    const ingredient = localStorage.getItem('inProgressRecipes');
    const a = false;
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ data.strDrinkThumb }
          alt={ data.strDrink }
        />
        {/* fazer igual ao title do header? */}
        <h1 data-testid="recipe-title">{data.strDrink}</h1>
        {/* botões de compartilhar e favoritar */}
        <button
          data-testid="share-btn"
          type="button"
          src={ shareIcon }
        >
          <img src={ shareIcon } alt="lupa" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          /*  src={ nomeGenerico }  *//* nome da função com o if ou ternário buscando os corações black e white */
          /* onClick={ this.showInput } */
        >
          {/* <img src={ nomeGenerico } alt="lupa" /> */}
        </button>
        <h3 data-testid="recipe-category">{ data.strAlcoholic }</h3>
        {/* o index é um link e estava entre {}, a verificação será feita pelo length do atributo */}
        <ul>
          { Object.keys(data).filter((recipe) => recipe.includes('strIngredient'))
            .map((recipe, index) => (
              data[recipe] && (
                <div
                  key={ recipe }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <p>{`${data[`strMeasure${index + 1}`]} ${data[recipe]}`}</p>
                  <input
                    type="checkbox"
                    checked={ JSON.parse(ingredient)
                      === `${data[`strMeasure${index + 1}`]} ${data[recipe]}` ? true
                      : a }
                    onClick={ () => {
                      localStorage.setItem(
                        'inProgressRecipes',
                        JSON.stringify(
                          `${data[`strMeasure${index + 1}`]} ${data[recipe]}`,
                        ),
                      );
                    } }
                  />
                </div>
              )
            )) }
        </ul>
        <p data-testid="instructions">{ data.strInstructions }</p>
        <Link to="/done-recipes">
          <button
            className="finishRecipeBtn"
            data-testid="finish-recipe-btn"
            type="button"
          >
            Finish Recipe
          </button>
        </Link>
      </div>
    );
  }
}

DrinksInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

};

export default connect()(DrinksInProgress);
