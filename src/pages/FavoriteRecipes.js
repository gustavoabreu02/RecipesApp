import React from 'react';
import Header from '../components/Header';
// import shareIcon from '../images/shareIcon.svg';

// O código de dentro do return estava quebrando o 7 então removi, mas está salvo e enviado no slack

class FavoriteRecipes extends React.Component {
  render() {
    return (
      <div className="body color">
        <Header title="Favorite Recipes" />
        <div className="favoriteContainer">
          <p> Aqui virá o resto do conteúdo</p>
        </div>
      </div>
    );
  }
}

export default FavoriteRecipes;

// corrigir css
