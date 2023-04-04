const age = document.getElementById('age');
const feet = document.getElementById('feet');
const inches = document.getElementById('inches');
const weight = document.getElementById('weight');
const calculateBtn = document.getElementById('calculate');

function convertHeight(feet, inches) {
	let height = (feet * 12) + inches;
    return height * 2.54;
};

function convertWeight(pounds) {
    return (pounds / 2.205);
};

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'e409a1e803msh766fbb1e9b121adp1bdf3cjsn6cf9edfecdb6',
		'X-RapidAPI-Host': 'calorie-calculator.p.rapidapi.com'
	}
};

calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();
	let centimeters = convertHeight(parseInt(feet.value), parseInt(inches.value));
	let kilograms = convertWeight(weight.value);
    fetch(`https://calorie-calculator.p.rapidapi.com/caloriecalculator.php?age=${age.value}%3CREQUIRED%3E&height=${centimeters}%3CREQUIRED%3E&weight=${kilograms}%3CREQUIRED%3E`, options)
	    .then(response => response.json())
	    .then(response => {
			console.log(response);
		})
	    .catch(err => console.error(err));
})