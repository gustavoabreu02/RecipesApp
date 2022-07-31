import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

const mealsDoc = meals;
const drinksDoc = drinks;

const typeMeals = {
  meals: [
    { strCategory: 'Beef' }, { strCategory: 'Breakfast' }, { strCategory: 'Chicken' },
    { strCategory: 'Dessert' }, { strCategory: 'Goat' }, { strCategory: 'Lamb' },
    { strCategory: 'Miscellaneous' }, { strCategory: 'Pasta' }, { strCategory: 'Pork' },
    { strCategory: 'Seafood' }, { strCategory: 'Side' }, { strCategory: 'Starter' },
    { strCategory: 'Vegan' }, { strCategory: 'Vegetarian' }] };

const typeDrinks = {
  drinks: [
    { strCategory: 'Ordinary Drink' }, { strCategory: 'Cocktail' },
    { strCategory: 'Shake' }, { strCategory: 'Other / Unknown' },
    { strCategory: 'Cocoa' }, { strCategory: 'Shot' },
    { strCategory: 'Coffee / Tea' }, { strCategory: 'Homemade Liqueur' },
    { strCategory: 'Punch / Party Drink' }, { strCategory: 'Beer' },
    { strCategory: 'Soft Drink' }] };

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

const ordinaryDrinks = {
  drinks: [{
    strDrink: 'Cherry Rum',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/twsuvr1441554424.jpg',
    idDrink: '11239',
  }] };

const cocktailDrinks = {
  drinks: [{
    strDrink: 'Tequila Sunrise',
    strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/quqyqp1480879103.jpg',
    idDrink: '13621',
  }] };

/* const mock = (url) => Promise.resolve({
  jest.spyOn(global, )
  status: 200,
  ok: true,
  json: () => {
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(mealsDoc); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(typeMeals); }
    if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=chocolate') { return Promise.resolve(dessertMeals); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') { return Promise.resolve(drinksDoc); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') { return Promise.resolve(typeDrinks); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=chocolate') { return Promise.resolve(cocoaDrinks); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c') { return Promise.resolve(ordinaryDrinks); }
    if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=tequila') { return Promise.resolve(cocktailDrinks); }
    // https://www.themealdb.com/api/json/v1/1/search.php?s=big%20mac
    // https://www.themealdb.com/api/json/v1/1/lookup.php?i=53013
  },
}); */

const mock = jest.spyOn(global, 'fetch')
  .mockImplementation((url) => Promise.resolve({
    json: async () => {
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return mealsDoc;
      if (url === 'https://www.themealdb.com/api/json/v1/1/list.php?c=list') return typeMeals;
      if (url === 'https://www.themealdb.com/api/json/v1/1/search.php?s=chocolate') return dessertMeals;
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return drinksDoc;
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list') return typeDrinks;
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=chocolate') return cocoaDrinks;
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c') return ordinaryDrinks;
      if (url === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=tequila') return cocktailDrinks;
      // https://www.themealdb.com/api/json/v1/1/search.php?s=big%20mac
      // https://www.themealdb.com/api/json/v1/1/lookup.php?i=53013
    } }));

export default mock;
