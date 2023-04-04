const form = document.querySelector('form');
//const generateCards = require('./generateCards');
var recipeContainer = document.querySelector('#output');
form.addEventListener('submit', function(event) {
  event.preventDefault(); // prevent the form from submitting

  const userInput = {
    query: 'pasta',
    cuisine: 'italian',
    maxReadyTime: '20',
    type: 'main course',
    minCalories: '50',
    maxCalories: '800'
  };
  
  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    params: {
      query: userInput.query,
      cuisine: userInput.cuisine,
      maxReadyTime: userInput.maxReadyTime,
      type: userInput.type,
      minCalories: userInput.minCalories,
      maxCalories: userInput.maxCalories,
      number: '10', // default value for number
      ranking: '2' // default value for ranking
    },
    headers: {
      'X-RapidAPI-Key': '3d5db3c0abmsh320832ed35d8ba3p126149jsne027b3581b02',
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };

  function generateCards (response) {
    let cardContainer = [];
    let recipeArr = response.data.results;

    for (let i = 0; i < recipeArr.length; i++) {
        let recipeCard = document.createElement("div");
        recipeCard.className = "max-w-sm rounded overflow-hidden shadow-lg";

        let recipeImg = document.createElement("img");
        recipeImg.className = "w-full";
        recipeImg.src = recipeArr[i].image;

        let recipeCardBody = document.createElement("div");
        recipeCardBody.className = "px-6 py-4";

        let recipeName = document.createElement("div");
        recipeName.className = "font-bold text-xl mb-2";
        recipeName.textContent = recipeArr[i].title;

        let recipeCalories = document.createElement("p");
        recipeCalories.className = "text-gray-700 text-base";
        recipeCalories.textContent = "Calories: " + recipeArr[i].nutrition.nutrients[0].amount;

        recipeCardBody.append(recipeName);
        recipeCardBody.append(recipeCalories);

        recipeCard.append(recipeImg);
        recipeCard.append(recipeCardBody);
        cardContainer.push(recipeCard);
    }

    return cardContainer;
}
  
  axios.request(options).then(function (response) {
    let recipeCards = generateCards(response);
    for (let i = 0; i < recipeCards.length; i++) {
      recipeContainer.append(recipeCards[i]);
    }            
  }).catch(function (error) {
    console.error(error);
  });
  
});
