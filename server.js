8
const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the ShoppingList model, which we'll
// interact with in our GET endpoint
const {ShoppingList, Recipes} = require('./models');

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at. Note that 
// normally you wouldn't do this. Usually your
// server will simply expose the state of the
// underlying database.
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);

// adding 'recipes'

Recipes.create(
  'Guacamole', ['3 avocados (ripe)',
    '1 small onion',
    '2 Roma tomatoes', 
    '3 tbsp, fresh cilantro',
    '1 jalapeno pepper',
    '2 garlic cloves', 
    '1 lime', 
    '1/2 tsp sea salt']);

    Recipes.create(
      'Mole', [ '2 cups broth', '2 dried guajillo chiles', '2 dried ancho chiles', 
        '3 dried chipotle chiles', '2 corn tortillas', '2 tomatoes', 
       '5 tomatillos']
    );


// when the root of this route is called with GET, return
// all current ShoppingList items by calling `ShoppingList.get()`
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

app.get('/recipes', (req, res) => {
  res.json(Recipes.get());
});



app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
