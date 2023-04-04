const form = document.querySelector('form');
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
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    output.textContent = JSON.stringify(response, null, 2);                
  }).catch(function (error) {
    console.error(error);
  });
  
});
