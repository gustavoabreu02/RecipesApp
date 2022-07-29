import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import YouTube from 'react-youtube'; // rode o npm 'npm i react-youtube'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg'; // import dos corações para lógica - cheio
// import whiteHeartIcon from '../images/whiteHeartIcon.svg'; // import dos corações para lógica - vazio

const copy = require('clipboard-copy');

class DetailsDrinks extends React.Component {
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
  }

    state = {
      recomendações: [],
      buttonFavorite: true,
      copied: false,
    }

  pause = (event) => {
    event.target.pauseVideo();
  }

  componentDidMount = () => {
    const { data } = this.props;
    const recipeFavorite = localStorage.getItem('doneRecipes');
    if (JSON.parse(recipeFavorite).some((recipe) => recipe.id === data.idDrink)) {
      this.setState({
        buttonFavorite: false,
      });
    }
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((recomendações) => this.setState({ recomendações: recomendações.meals }));
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
      .cocktails).some((idRecipe) => idRecipe === data.idDrink)) {
      return true;
    }
  }

  render() {
    const number = 5;
    const { data } = this.props;
    const { recomendações, buttonFavorite, copied } = this.state;
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
          src={ data.strDrinkThumb }
          alt={ data.strDrink }
        />
        {/* fazer igual ao title do header? */}
        <h1 data-testid="recipe-title">{ data.strDrink }</h1>
        {/* botões de compartilhar e favoritar */}
        <button
          data-testid="share-btn"
          type="button"
          src={ shareIcon }
          onClick={ () => this.copy('drinks', data.idDrink) }
        >
          <img src={ shareIcon } alt="lupa" />
        </button>
        { copied ? (
          <p>Link copied!</p>
        ) : '' }
        <button
          data-testid="favorite-btn"
          type="button"
          src="a" /* nome da função com o if ou ternário buscando os corações black e white */
          /* onClick={ this.showInput } */
        >
          {/* <img src={ nomeGenerico } alt="lupa" /> */}
        </button>
        <h3 data-testid="recipe-category">{data.strAlcoholic}</h3>
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
        {/** Source: https://www.geeksforgeeks.org/how-to-add-youtube-videos-in-next-js/ consultado conforme indicado no Readme */}
        {/* Youtube será encapsulado por ternário só tem em foods, manter o comentário de cima */}
        <YouTube
          data-testid="video"
          videoId={ data.strYoutube } /* puxar video da api de acordo com lógica */
          opts={ opts }
          onReady={ this.pause }
        />
        <div className="scrollmenu">
          { recomendações.filter((recipe, i) => i <= number)
            .map((recipe, i1) => (
              <div
                key={ recipe.idMeal }
                className="individualCardC"
                data-testid={ `${i1}-recomendation-card` }
              >
                <img
                  className="imgFandD"
                  src={ recipe.strMealThumb }
                  alt={ recipe.strMeal }
                  data-testid={ `${i1}-card-img` }
                />
                <span data-testid={ `${i1}-card-name` }>
                  { recipe.strMeal }
                </span>
                <p
                  data-testid={ `${i1}-recomendation-title` }
                >
                  { recipe.strMeal }

                </p>
              </div>

            )) }
        </div>
        { buttonFavorite && (
          <Link to={ `${pathname}/in-progress` }>
            <button
              className="startRecipeBtn"
              data-testid="start-recipe-btn"
              type="button"
              onClick={ async () => {
                localStorage.setItem('doneRecipes', JSON.stringify([{
                  id: data.idDrink,
                  type: 'Drink',
                  nationality: data.strArea,
                  category: data.strCategory,
                  alcoholicOrNot: data.strAlcoholic,
                  name: data.strDrink,
                  image: data.strDrinkThumb,
                  doneDate: new Date(),
                  tags: [data.strTags],
                }]));
                const driksStorage = JSON
                  .parse(localStorage.getItem('inProgressRecipes'));
                driksStorage.cocktails[data.idDrink] = Object.entries(data)
                  .filter((recipe) => recipe[0]
                    .includes('strIngredient') && recipe[1] != null)
                  .map((recipe) => recipe[1]);
                localStorage
                  .setItem('inProgressRecipes', JSON.stringify(driksStorage));
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

DetailsDrinks.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
};

export default connect()(DetailsDrinks);
