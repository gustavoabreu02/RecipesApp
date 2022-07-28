import React from 'react';
import PropTypes from 'prop-types';
import { createBrowserHistory } from 'history';
import YouTube from 'react-youtube'; // rode o npm 'npm i react-youtube'
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg'; // import dos corações para lógica - cheio
// import whiteHeartIcon from '../images/whiteHeartIcon.svg'; // import dos corações para lógica - vazio

class DetailsFoods extends React.Component {
  state = {
    recomendações: [],
  }

  pause = (event) => {
    event.target.pauseVideo();
  }

  componentDidMount = () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((recomendações) => this.setState({ recomendações: recomendações.drinks }));
  }

  render() {
    const number = 5;
    const { data } = this.props;
    const { recomendações } = this.state;

    /** Source: https://www.geeksforgeeks.org/how-to-add-youtube-videos-in-next-js/ consultado conforme indicado no Readme */
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };

    const history = createBrowserHistory();
    const { location: { pathname } } = history;

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
        >
          <img src={ shareIcon } alt="lupa" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          src="a" /* nome da função com o if ou ternário buscando os corações black e white */
          /* onClick={ this.showInput } */
        >
          {/* <img src={ nomeGenerico } alt="lupa" /> */}
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
        {/** Source: https://www.geeksforgeeks.org/how-to-add-youtube-videos-in-next-js/ consultado conforme indicado no Readme */}
        {/* Youtube será encapsulado por ternário só tem em foods, manter o comentário de cima */}
        <div data-testid="video">
          <YouTube
            videoId={ data.strYoutube } /* puxar video da api de acordo com lógica */
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
        <Link to={ `${pathname}/in-progress` }>
          <button
            className="startRecipeBtn"
            data-testid="start-recipe-btn"
            type="button"
          >
            Start Recipe
          </button>
        </Link>
      </div>
    );
  }
}

DetailsFoods.propTypes = {
  data: PropTypes.objectOf().isRequired,
};

export default DetailsFoods;
