import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg'; // import dos corações para lógica - cheio
import whiteHeartIcon from '../images/whiteHeartIcon.svg'; // import dos corações para lógica - vazio

const copy = require('clipboard-copy');

class FoodsInProgress extends React.Component {
  constructor() {
    super();
    if (localStorage.getItem('ingredientsFoods') === null) {
      localStorage.setItem('ingredientsFoods', JSON.stringify({}));
    }
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }

  state = {
    data: [],
    ingredientFeito: false,
    ingredientCheckbox: [],
    renderCheckbox: true,
    buttonFinish: {},
    srcFavorite: false,
    copied: false,
  }

  componentDidMount = async () => {
    const { match, location } = this.props;
    const ingredientsFoods = localStorage.getItem('ingredientsFoods');
    if (JSON.parse(ingredientsFoods)[location.pathname
      .split('/')[2]] === undefined) {
      this.setState({
        renderCheckbox: false,
      });
    }
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
    const { data } = this.state;
    console.log(data);
    Object.keys(data).filter((recipe) => recipe.includes('strIngredient'))
      .forEach((recipe) => {
        if (`${data[recipe]}` !== 'null' && `${data[recipe]}` !== '') {
          this.setState((state) => ({

            buttonFinish: {
              ...state.buttonFinish,
              [`${data[recipe]}`]: false,
            },
          }));
        }
      });
    const favorite = localStorage.getItem('favoriteRecipes');
    JSON.parse(favorite).forEach((recipe) => {
      if ([recipe.id].includes(location.pathname.split('/')[2])) {
        this.setState({
          srcFavorite: true,
        });
      }
    });
  };

  handleChange = () => {
    this.setState((state) => ({
      ingredientFeito: !state.ingredientFeito,
    }));
  };

  copy = (type, id) => {
    copy(`http://localhost:3000/${type}/${id}`);
    this.setState({
      copied: true,
    });
  }

  render() {
    const ingredientsFoods = localStorage.getItem('ingredientsFoods');
    const { location } = this.props;
    const { data,
      ingredientFeito, copied,
      ingredientCheckbox, renderCheckbox, buttonFinish, srcFavorite } = this.state;
    console.log(buttonFinish);
    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ data.strMealThumb }
          alt={ data.strMeal }
        />
        {/* fazer igual ao title do header? */}
        <h1 data-testid="recipe-title">{data.strMeal}</h1>
        {/* botões de compartilhar e favoritar */}
        <button
          data-testid="share-btn"
          type="button"
          src={ shareIcon }
          onClick={ () => this.copy('foods', data.idMeal) }
        >
          <img src={ shareIcon } alt="lupa" />
        </button>
        { copied ? (
          <p>Link copied!</p>
        ) : '' }
        <button
          data-testid="favorite-btn"
          type="button"
          src={ srcFavorite ? blackHeartIcon : whiteHeartIcon } /* nome da função com o if ou ternário buscando os corações black e white */
          onClick={ () => {
            this.setState({
              srcFavorite: !srcFavorite,
            });
            const favRecipe = JSON
              .parse(localStorage.getItem('favoriteRecipes'));
            localStorage.setItem('favoriteRecipes', JSON.stringify([...favRecipe, {
              id: data.idMeal,
              type: 'food',
              nationality: data.strArea,
              category: data.strCategory,
              alcoholicOrNot: '',
              name: data.strMeal,
              image: data.strMealThumb,
            }]));
          } }
        >
          <img src={ srcFavorite ? blackHeartIcon : whiteHeartIcon } alt="lupa" />
        </button>
        <h3 data-testid="recipe-category">{ data.strCategory }</h3>
        {/* o index é um link e estava entre {}, a verificação será feita pelo length do atributo */}
        <ul>
          { Object.keys(data).filter((recipe) => recipe.includes('strIngredient'))
            .map((recipe, index) => (
              data[recipe] && (
                <div
                  style={
                    ingredientFeito ? { textDecoration: 'line-through' }
                      : { textDecoration: '' }
                  }
                  key={ recipe }
                  data-testid={ `${index}-ingredient-step` }
                  htmlFor={ `${index}-ingredient-step` }
                >
                  <p>
                    {`${data[`strMeasure${index + 1}`]} ${data[recipe]}`}

                  </p>
                  <input
                    id={ `${index}-ingredient-step` }
                    type="checkbox"
                    defaultChecked={ renderCheckbox ? (
                      JSON.parse(ingredientsFoods)[location.pathname
                        .split('/')[2]].includes(`${data[recipe]}`)
                    ) : undefined }
                    onClick={ ({ target }) => {
                      console.log(1);
                      this.setState((state) => ({

                        buttonFinish: {
                          ...state.buttonFinish,
                          [`${data[recipe]}`]: target.checked,
                        },

                      }));
                      if (target.checked) {
                        const arrayIngredient = [...ingredientCheckbox,
                          `${data[recipe]}`];
                        const objIngredient = {
                          ...JSON.parse(ingredientsFoods),
                          [location.pathname.split('/')[2]]: arrayIngredient,
                        };
                        localStorage.setItem('ingredientsFoods',
                          JSON.stringify(objIngredient));
                        this.setState((state) => ({
                          ingredientCheckbox:
                        [...state.ingredientCheckbox, `${data[recipe]}`],
                        }));
                      } else {
                        const arrayIngredient = [...ingredientCheckbox,
                          `${data[recipe]}`];
                        const objIngredient = {
                          ...JSON.parse(ingredientsFoods),
                          [location.pathname.split('/')[2]]: arrayIngredient
                            .filter((ingre) => ingre !== `${data[recipe]}`),
                        };
                        localStorage.setItem('ingredientsFoods',
                          JSON.stringify(objIngredient));
                        this.setState((state) => ({
                          ingredientCheckbox:
                          state.ingredientCheckbox
                            .filter((ingre) => ingre !== `${data[recipe]}`),
                        }));
                      }
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
            disabled={ Object.values(buttonFinish).includes(false) }
          >
            Finish Recipe
          </button>
        </Link>
      </div>
    );
  }
}

FoodsInProgress.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,

};

export default connect()(FoodsInProgress);

// Fazer css
