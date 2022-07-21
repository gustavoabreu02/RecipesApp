import React from 'react';
import YouTube from 'react-youtube'; // rode o npm 'npm i react-youtube'

export default class RecipeDetails extends React.Component {
  pause = (event) => {
    event.target.pauseVideo();
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1,
      },
    };
    return (
      <>
        <h1>Recipe Details</h1>
        <div>
          <img
            data-testid="recipe-photo"
            src=""
            alt=""
          />
          fazer igual ao title do header?
          <h1 data-testid="recipe-title">{recipeTitle}</h1>
          <h3 data-testid="recipe-category">{recipeCategory}</h3>
          <ul data-testid="index-ingredient-name-and-measure">
            <li>virá a lógica para colocar os ingredientes em lista buscando da api</li>
          </ul>
          <p data-testid="instructions">texto da api</p>
          {/* Youtube será encapsulado por ternário só tem em foods */}
          <YouTube
            data-testid="video"
            videoId="" /* puxar video da api de acordo com lógica */
            opts={ opts }
            onReady={ this.pause }
          />
          <div data-testid="index-recomendation-card">colocar card de recomendações</div>
        </div>

      </>
    );
  }
}
