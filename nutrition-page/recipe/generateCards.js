function generateCards (response) {
    let cardContainer = [];
    let recipeArr = response.data.results;

    for (let i = 0; i < recipeArr.length; i++) {
        let recipeCard = document.createElement("div");
        recipeCard.className("max-w-sm rounded overflow-hidden shadow-lg");

        let recipeImg = document.createElement("img");
        recipeImg.className("w-full").src(recipeArr[i].image);

        let recipeCardBody = document.createElement("div");
        recipeCardBody.className("px-6 py-4");

        let recipeName = document.createElement("div");
        recipeName.className("font-bold text-xl mb-2")
        recipeName.textContent(recipeArr[i].title);

        let recipeCalories = document.createElement("p");
        recipeCalories.className("text-gray-700 text-base");
        recipeCalories.textContent("Calories: " + recipeArr[i].nutrition.nutrients[0].amount);

        recipeCardBody.append(recipeName);
        recipeCardBody.append(recipeCalories);

        recipeCard.append(recipeImg);
        recipeCard.append(recipeCardBody);
        cardContainer.push(recipeCard);
    }

    return cardContainer;
}

module.exports = generateCards;