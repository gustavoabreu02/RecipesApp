import React from 'react';

class SearchBar extends React.Component {
  render() {
    return (
      <div>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
          />
          Ingredient
        </label>
        <label htmlFor="nameSearch">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="nameSearch"
          />
          Name
        </label>
        <label htmlFor="firstLetter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="firstLetter"
          />
          First letter
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ this.showInput }
        >
          Search
        </button>
      </div>
    );
  }
}

export default SearchBar;
