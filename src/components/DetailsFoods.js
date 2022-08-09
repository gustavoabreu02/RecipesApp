import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';
import YouTube from 'react-youtube'; // rode o npm 'npm i react-youtube'
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg'; // import dos corações para lógica - cheio
import whiteHeartIcon from '../images/whiteHeartIcon.svg'; // import dos corações para lógica - vazio

const copy = require('clipboard-copy');

class DetailsFoods extends React.Component {
  constructor() {
    super();
    if (localStorage.getItem('inProgressRecipes') === null) {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ cocktails: {
          'id-da-bebida': ['lista-de-ingredientes-bebidas'],
        },
        meals: {
          'id-da-comida': ['lista-de-ingredientes-comidas'],
        } }));
    }
    if (localStorage.getItem('doneRecipes') === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([]));
    }
    if (localStorage.getItem('favoriteRecipes') === null) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  }

  state = {
    recomendações: [],
    copied: false,
    srcFavorite: false,
    /* favoriteRecipe: false, */
  }

  pause = (event) => {
    event.target.pauseVideo();
  }

  componentDidMount = () => {
    const history = createBrowserHistory();
    const { location: { pathname } } = history;
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((recomendações) => this.setState({ recomendações: recomendações.drinks }));
    const favorite = localStorage.getItem('favoriteRecipes');
    JSON.parse(favorite).forEach((recipe) => {
      if ([recipe.id].includes(pathname.split('/')[2])) {
        this.setState({
          srcFavorite: true,
        });
      }
    });
  }

  copy = (type, id) => {
    copy(`http://localhost:3000/${type}/${id}`);
    this.setState({
      copied: true,
    });
  }

  startRecipeOrNot = () => {
    const { data } = this.props;
    const startRecipesJson = localStorage.getItem('inProgressRecipes');
    const startRecipes = JSON.parse(startRecipesJson);
    if (Object.keys(startRecipes
      .meals).some((idRecipe) => idRecipe === data.idMeal)) {
      return true;
    }
  }

  render() {
    const doneRecipes = localStorage.getItem('doneRecipes');
    const recipeFavorite = localStorage.getItem('doneRecipes');
    const number = 5;
    const { data } = this.props;
    const { recomendações, copied, srcFavorite } = this.state;
    const history = createBrowserHistory();
    const { location: { pathname } } = history;

    /** Source: https://www.geeksforgeeks.org/how-to-add-youtube-videos-in-next-js/ consultado conforme indicado no Readme */
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };

    return (
      <div>
        <img
          data-testid="recipe-photo"
          src={ data.strMealThumb }
          alt={ data.strMeal }
        />
        {/* fazer igual ao title do header? */}
        <h1 data-testid="recipe-title">{ data.strMeal }</h1>
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
        {/* {favoriteRecipe ? ( */}
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
        <h3 data-testid="recipe-category">{data.strCategory}</h3>
        {/* o index é um link e estava entre {}, a verificação será feita pelo length do atributo */}
        <ul>
          { Object.keys(data).filter((recipe) => recipe.includes('strIngredient'))
            .map((recipe, index) => (
              data[recipe] && (
                <div
                  key={ recipe }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  <p>{`${data[`strMeasure${index + 1}`]} ${data[recipe]}`}</p>
                </div>
              )
            )) }
        </ul>
        <p data-testid="instructions">{ data.strInstructions }</p>
        <div data-testid="video">
          <YouTube
            videoId={ data.strYoutube }
            opts={ opts }
            onReady={ this.pause }
          />
        </div>
        <div className="scrollmenu">
          { recomendações.filter((recipe, i) => i <= number)
            .map((recipe, i1) => (
              <div
                key={ recipe.idDrink }
                className="individualCardC"
                data-testid={ `${i1}-recomendation-card` }
              >
                <img
                  className="imgFandD"
                  src={ recipe.strDrinkThumb }
                  alt={ recipe.strDrink }
                  data-testid={ `${i1}-card-img` }
                />
                <span data-testid={ `${i1}-card-name` }>
                  { recipe.strDrink }
                </span>
                <p
                  data-testid={ `${i1}-recomendation-title` }
                >
                  { recipe.strDrink }
                </p>
              </div>
            )) }
        </div>
        { !JSON.parse(recipeFavorite).some((recipe) => recipe.id === data.idMeal) && (
          <Link to={ `${pathname}/in-progress` }>
            <button
              className="startRecipeBtn"
              data-testid="start-recipe-btn"
              type="button"
              onClick={ () => {
                const arrayDoneRecipes = [
                  ...JSON.parse(doneRecipes),
                  {
                    id: data.idMeal,
                    type: 'Meal',
                    nationality: data.strArea,
                    category: data.strCategory,
                    alcoholicOrNot: '',
                    name: data.strMeal,
                    image: data.strMealThumb,
                    doneDate: new Date(),
                    tags: [data.strTags],
                  },
                ];
                localStorage.setItem('doneRecipes', JSON.stringify(arrayDoneRecipes));
                const foodsStorage = JSON
                  .parse(localStorage.getItem('inProgressRecipes'));
                foodsStorage.meals[data.idMeal] = Object.entries(data)
                  .filter((recipe) => recipe[0]
                    .includes('strIngredient') && recipe[1] != null)
                  .map((recipe) => recipe[1]);
                localStorage
                  .setItem('inProgressRecipes', JSON.stringify(foodsStorage));
              } }
            >
              { this.startRecipeOrNot() ? 'Continue Recipe' : 'Start Recipe' }
            </button>
          </Link>

        ) }
      </div>
    );
  }
}

DetailsFoods.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default connect()(DetailsFoods);
