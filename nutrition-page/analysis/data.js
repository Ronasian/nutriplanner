// setting the html elements to const
const urlTwo = 'https:api.edamam.com/api/nutrition-data';
const searchBtn = document.getElementById('search-button');
const input = document.getElementById('search-input');
const output = document.getElementById('output');
const form = document.getElementById('search-form');
const app_id = '0b73859d'; //necessary info for API call
const app_key = '844eab6757ea5304250ae7aee4b9cf63'; //necessary info for API call

 form.addEventListener('submit', event => {
     event.preventDefault();
     console.log('Form submitted');
     const text = input.value;
     const query = `app_id=${app_id}&app_key=${app_key}&ingr=${text}`;
     fetch(`${urlTwo}?${query}`)
     .then(response => {
         if (response.ok) {
             console.log('Response is ok'); 
             response.json().then(data => {
                 const nutrientValues = {};
                const nutrientsToDisplay = ['ENERC_KCAL', 'FAT', 'FASAT', 'FATRN', 'CHOLE', 'NA', 'CHOCDF', 'FIBTG', 'SUGAR', 'PROCNT', 'VITA_RAE', 'VITC', 'CA', 'FE'];
                nutrientsToDisplay.forEach(nutrient => {
                    if (data.totalNutrients[nutrient]) {
                      nutrientValues[nutrient] = Math.round(data.totalNutrients[nutrient].quantity);
                    } else {
                      nutrientValues[nutrient] = 0;
                    }
                  });
                // creating the ul elements for the list items
                const list = document.createElement('ul');

                // loop through the values and add each one as a <li> item 
                for (const nutrient in nutrientValues) {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${nutrient}: ${nutrientValues[nutrient]}`;
                    list.appendChild(listItem);
                }

                // appending the list to the output element
                output.innerHTML = '';
                output.appendChild(list);

                console.log(nutrientValues);

            });
                
           
           
         } else {
             output.textContent = 'Error: Unable to retrieve nutrition data.';
         }
     })
     .catch(error => console.error(error));

 });