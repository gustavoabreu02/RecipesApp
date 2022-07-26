const dessertMeals = {
  meals: [{
    strMeal: 'Chocolate Gateau',
    strMealThumb: 'https://www.themealdb.com/images/media/meals/tqtywx1468317395.jpg',
    idMeal: '52776',
  }] };

const cocoaDrinks = {
  drinks: [{
    strDrink: 'Chocolate Drink',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/q7w4xu1487603180.jpg',
    idDrink: '12734',
  }] };

const moch = (url) => Promise.resolve({
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=chocolate') { return Promise.resolve(dessertMeals); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=chocolate') { return Promise.resolve(cocoaDrinks); }
  },
});

module.exports = moch;
