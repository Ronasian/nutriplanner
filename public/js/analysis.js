// setting the html elements to const
const input = document.getElementById('analysis');
const output = document.getElementById('output');
const form = document.querySelector('.analysis-form');

 const retrieveAPIData = async () => {
    const response = await fetch('/api/nutriplanner/analysis', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      console.log('success');
      const data = await response.json();
      console.log(data);
      displayData(data);
    }
 }

 function displayData(data) {
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
 }

 const analysisFormHandler = async (event) => {
    event.preventDefault();

    const userInput = input.value;

    if (userInput) {
      const response = await fetch('/api/nutriplanner/analysis', {
        method: 'POST',
        body: JSON.stringify({ userInput }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        console.log(response);
        retrieveAPIData();
      } else {
        alert('Failed to receive response');
      }
    }
 }

 form.addEventListener('submit', analysisFormHandler);