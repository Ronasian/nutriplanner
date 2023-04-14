var recipeContainer = document.querySelector('#output');
var input1 = document.querySelector('#input1');
var input2 = document.querySelector('#input2');
var input3 = document.querySelector('#input3');
var input4 = document.querySelector('#input4');
var input5 = document.querySelector('#input5');

function generateCards (response) {
  let cardContainer = [];
  let recipeArr = response.results;

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

const receiveAPIData = async () => {
  const response = await fetch('/api/nutriplanner/recipes', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  if (response.ok) {
    console.log('success');
    const data = await response.json();
    console.log(data);
    recipeContainer.innerHTML = "";
    let recipeCards = generateCards(data);
    for (let i = 0; i < recipeCards.length; i++) {
      recipeContainer.append(recipeCards[i]);
    }
  }
}


const recipeFormHandler = async (event) => {
  event.preventDefault();

  const userInput = {
    query: input2.value,
    cuisine: input1.value,
    maxReadyTime: input3.value,
    type: 'main course',
    minCalories: '50',
    maxCalories: input5.value
  };

  if (userInput) {
    const response = await fetch('/api/nutriplanner/recipes', {
      method: 'POST',
      body: JSON.stringify({ userInput }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      console.log(response);
      receiveAPIData();
    } else {
      alert('No response received');
    }
  }
};

let recipeForm = document.querySelector('.recipe-form');
if (recipeForm) {recipeForm.addEventListener('submit', recipeFormHandler);}