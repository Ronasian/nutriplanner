
const url = 'https://www.edamam.com/#!/Full_Recipe_Analysis/post_api_nutrition_details';
const app_id = '0b73859d';
const app_key = '844eab6757ea5304250ae7aee4b9cf63'; 

const recipe_url = 'https://www.edamam.com/recipes/1234'; // example URL - recipe you want to analyze

const payload = {app_id: app_id, app_key: app_key, url: recipe_url};

//request for recipe nutrition data 
fetch(url, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
})
.then(response => {
    if (response.ok) {
        response.json().then(nutrition_info => {
            console.log(nutrition_info);
        });
    } else {
        console.log('Error: Unable to retrieve nutrition information.');
    }
})
.catch(error => console.error(error));


//request for a specific ingredient's nutrition data
const urlTwo = 'https://api.edamam.com/api/nutrition-data';
const form = document.getElementById('nutrition-form');
const input = document.getElementById('nutrition-input');
const output = document.getElementById('nutrition-data');

form.addEventListener('submit', event => {
    event.preventDefault();
    console.log('Form submitted');
    const text = input.value;
    const query = `app_id=${app_id}&app_key=${app_key}&ingr=${text}`;
    fetch(`${urlTwo}?${query}`)
    .then(response => {
        if (response.ok) {
            console.log('Response is ok'); // Add this line
            response.json().then(nutrition_data => {
                output.textContent = JSON.stringify(nutrition_data, null, 2);
                console.log(nutrition_data)
            });
        } else {
            output.textContent = 'Error: Unable to retrieve nutrition data.';
        }
    })
    .catch(error => console.error(error));

});


