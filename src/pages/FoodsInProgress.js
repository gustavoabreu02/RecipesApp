import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg'; // import dos corações para lógica - cheio
// import whiteHeartIcon from '../images/whiteHeartIcon.svg'; // import dos corações para lógica - vazio

class FoodsInProgress extends React.Component {
  constructor() {
    super();
    if (localStorage.getItem('ingredientsFoods') === null) {
      localStorage.setItem('ingredientsFoods', JSON.stringify({}));
    }
  }

  state = {
    data: [],
    ingredientFeito: false,
    ingredientCheckbox: [],
    renderCheckbox: true,
    buttonFinish: {},
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
  };

  handleChange = () => {
    this.setState((state) => ({
      ingredientFeito: !state.ingredientFeito,
    }));
  };

  render() {
    const ingredientsFoods = localStorage.getItem('ingredientsFoods');
    const { location } = this.props;
    const { data,
      ingredientFeito, ingredientCheckbox, renderCheckbox, buttonFinish } = this.state;
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
