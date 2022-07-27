import React from 'react';
import PropTypes from 'prop-types';
import YouTube from 'react-youtube'; // rode o npm 'npm i react-youtube'
import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg'; // import dos corações para lógica - cheio
// import whiteHeartIcon from '../images/whiteHeartIcon.svg'; // import dos corações para lógica - vazio

class DetailsDrinks extends React.Component {
    state = {
      recomendações: [],
    }

  pause = (event) => {
    event.target.pauseVideo();
  }

  componentDidMount = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((recomendações) => this.setState({ recomendações: recomendações.meals }));
  }

  render() {
    const number = 5;
    const { data } = this.props;
    const { recomendações } = this.state;
    console.log(recomendações);
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
        <button
          className="startRecipeBtn"
          data-testid="start-recipe-btn"
          type="button"
        >
          Start Recipe
        </button>
      </div>
    );
  }
}

DetailsDrinks.propTypes = {
  data: PropTypes.objectOf().isRequired,
};

export default DetailsDrinks;
