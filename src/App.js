import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Foods from './pages/Foods';
import FoodsRecipe from './pages/FoodsRecipe';
import FoodsInProgress from './pages/FoodsInProgress';
import Drinks from './pages/Drinks';
import DrinksRecipe from './pages/DrinksRecipe';
import DrinksInProgress from './pages/DrinksInProgress';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';

function App() {
  return (
    <div className="meals">
      <span className="logo">TRYBE</span>
      <Switch>
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/foods/id-da-receita" component={ FoodsRecipe } />
        <Route
          exact
          path="/foods/id-da-receita/in-progress"
          component={ FoodsInProgress }
        />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/drinks/id-da-receita" component={ DrinksRecipe } />
        <Route
          exact
          path="/drinks/id-da-receita/in-progress"
          component={ DrinksInProgress }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
