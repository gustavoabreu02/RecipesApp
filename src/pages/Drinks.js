import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ComponentDrinks from '../components/ComponentDrinks';
/* import Recipes from './Recipes'; */

class Drinks extends React.Component {
  state = {
    data: { drinks: [] },
    category: { drinks: [] },
    filter: true,
    dataInicial: [],
  }

  componentDidMount = async () => {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => this.setState({ dataInicial: data.drinks, data: data.drinks }));
    fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
      .then((response) => response.json())
      .then((category) => this.setState({ category }));
  }

  handleClick = ({ target }) => {
    const { name } = target;
    const { filter, dataInicial } = this.state;
    if (filter) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`)
        .then((response) => response.json())
        .then((data) => this.setState({ data: data.drinks, filter: false }));
    } else {
      this.setState({
        data: dataInicial,
        filter: true,
      });
    }
  }

  handleClickButtonAll = () => {
    const { dataInicial } = this.state;
    this.setState({
      data: dataInicial,
    });
  }

  render() {
    const { data, category } = this.state;
    console.log(data);
    const number = 11;
    const numberFilter = 4;
    const { typeSearch } = this.props;
    return (
      <div className="body color">
        <Header
          title="Drinks"
          showIcon="true"
          className="headerContainer"
          { ...this.props }
        />
        { typeSearch ? (
          <ComponentDrinks />
        ) : (
          <div>
            <button
              type="button"
              data-testid="All-category-filter"
              onClick={ this.handleClickButtonAll }
            >
              All

            </button>
            { category.drinks.filter((cate, i) => i <= numberFilter).map((cate, i) => (
              <button
                name={ cate.strCategory }
                data-testid={ `${cate.strCategory}-category-filter` }
                key={ i }
                type="button"
                onClick={ this.handleClick }
              >
                { cate.strCategory }

              </button>
            )) }
            <div className="cardContainer">
              { data.length === 1
                ? (
                  <Link to={ `foods/${data[0].idDrink}` }>
                    <div
                      className="individualCardC"
                      data-testid={ `${0}-recipe-card` }
                      key={ data[0].idMeal }
                    >
                      <img
                        className="imgFandD"
                        src={ data[0].strMealThumb }
                        alt={ data[0].strMeal }
                        data-testid={ `${0}-card-img` }
                      />
                      <span data-testid={ `${0}-card-name` }>
                        { data[0].strMeal }
                      </span>
                    </div>
                  </Link>
                )
                : (
                  data[0] && (
                    data.filter((recipe, i) => i <= number)
                      .map((recipe, i1) => (
                        <Link to={ `drinks/${data[i1].idDrink}` } key={ recipe.idDrink }>
                          <div
                            className="individualCardC"
                            data-testid={ `${i1}-recipe-card` }
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
                          </div>
                        </Link>
                      ))
                  ))}
            </div>
          </div>
        )}
        <Footer { ...this.props } />
      </div>
    );
  }
}

Drinks.propTypes = {
  typeSearch: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  typeSearch: state.foodsReducer.typeSearch,
});

export default connect(mapStateToProps)(Drinks);

// css pronto
