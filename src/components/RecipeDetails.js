import React from 'react';
import YouTube from 'react-youtube'; // rode o npm 'npm i react-youtube'
import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg'; // import dos corações para lógica - cheio
// import whiteHeartIcon from '../images/whiteHeartIcon.svg'; // import dos corações para lógica - vazio

export default class RecipeDetails extends React.Component {
  pause = (event) => {
    event.target.pauseVideo();
  }

  render() {
    /** Source: https://www.geeksforgeeks.org/how-to-add-youtube-videos-in-next-js/ consultei conforme indicado no Readme */
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
          src=""
          alt=""
        />
        {/* fazer igual ao title do header? */}
        <h1 data-testid="recipe-title">{recipeTitle}</h1>
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
          src={ nomeGenerico } /* nome da função com o if ou ternário buscando os corações black e white */
          onClick={ this.showInput }
        >
          <img src={ nomeGenerico } alt="lupa" />
        </button>
        <h3 data-testid="recipe-category">{recipeCategory}</h3>
        <ul data-testid="index-ingredient-name-and-measure">
          <li>virá a lógica para colocar os ingredientes em lista buscando da api</li>
        </ul>
        <p data-testid="instructions">texto da api</p>
        {/** Source: https://www.geeksforgeeks.org/how-to-add-youtube-videos-in-next-js/ consultei conforme indicado no Readme */}
        {/* Youtube será encapsulado por ternário só tem em foods, manter o comentário de cima */}
        <YouTube
          data-testid="video"
          videoId="" /* puxar video da api de acordo com lógica */
          opts={ opts }
          onReady={ this.pause }
        />
        <span data-testid="index-recomendation-card">colocar card de recomendações</span>
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
