const age = document.getElementById('age');
const feet = document.getElementById('feet');
const inches = document.getElementById('inches');
const weight = document.getElementById('weight');
const calculateBtn = document.getElementById('calculate');
const calList = document.getElementById('calories');
const calDiv = document.getElementById('results');

function convertHeight(feet, inches) {
	let height = (feet * 12) + inches;
    return height * 2.54;
};

function convertWeight(pounds) {
    return (pounds / 2.205);
};

/* calculateBtn.addEventListener('click', (e) => {
    e.preventDefault();
	let centimeters = convertHeight(parseInt(feet.value), parseInt(inches.value));
	let kilograms = convertWeight(weight.value);
    fetch(`https://calorie-calculator.p.rapidapi.com/caloriecalculator.php?age=${age.value}%3CREQUIRED%3E&height=${centimeters}%3CREQUIRED%3E&weight=${kilograms}%3CREQUIRED%3E`, options)
	    .then(response => response.json())
	    .then(response => {
			console.log(response);

			let maintainEl = document.createElement('li');
			let gainOneEl = document.createElement('li');
			let gainTwoEl = document.createElement('li');
			let loseOneEl = document.createElement('li');
			let loseTwoEl = document.createElement('li');

			maintainEl.textContent = `You need a daily intake of ${response.calories} calories to maintain your current weight each week`;
			gainOneEl.textContent = `You need a daily intake of ${response.gain_500g_per_week} calories to gain about 1 pound per week`;
			gainTwoEl.textContent = `You need a daily intake of ${response.gain_1kg_per_week} calories to gain about 2 pounds per week`;
			loseOneEl.textContent = `You need a daily intake of ${response.lose_500g_per_week} calories to lose around 1 pound per week`;
			loseTwoEl.textContent = `You need a daily intake of ${response.lose_1kg_per_week} calories to lose around 2 pounds per week`;
			
			calList.appendChild(maintainEl);
			calList.appendChild(gainOneEl);
			calList.appendChild(gainTwoEl);
			calList.appendChild(loseOneEl);
			calList.appendChild(loseTwoEl);

			calDiv.classList.remove('hidden');
		})
	    .catch(err => console.error(err));
}); */

const receiveAPIData = async () => {
	const response = await fetch('/api/nutriplanner/tracker', {
	  method: 'GET',
	  headers: { 'Content-Type': 'application/json' },
	});
	if (response.ok) {
	  const data = await response.json();
	  displayResults(response);
	}
  }

function displayResults(response) {
	let maintainEl = document.createElement('li');
	let gainOneEl = document.createElement('li');
	let gainTwoEl = document.createElement('li');
	let loseOneEl = document.createElement('li');
	let loseTwoEl = document.createElement('li');

	maintainEl.textContent = `You need a daily intake of ${response.calories} calories to maintain your current weight each week`;
	gainOneEl.textContent = `You need a daily intake of ${response.gain_500g_per_week} calories to gain about 1 pound per week`;
	gainTwoEl.textContent = `You need a daily intake of ${response.gain_1kg_per_week} calories to gain about 2 pounds per week`;
	loseOneEl.textContent = `You need a daily intake of ${response.lose_500g_per_week} calories to lose around 1 pound per week`;
	loseTwoEl.textContent = `You need a daily intake of ${response.lose_1kg_per_week} calories to lose around 2 pounds per week`;
	
	calList.appendChild(maintainEl);
	calList.appendChild(gainOneEl);
	calList.appendChild(gainTwoEl);
	calList.appendChild(loseOneEl);
	calList.appendChild(loseTwoEl);

	calDiv.classList.remove('hidden');
}

const trackerFormHandler = async () => {
	let userCentimeters = convertHeight(parseInt(feet.value), parseInt(inches.value));
	let userKilograms = convertWeight(weight.value);

	const userData = {
		centimeters: userCentimeters,
		kilograms: userKilograms,
		userAge: age.value
	}
	console.log(userData);
	if (userData) {
		const response = await fetch('/api/nutriplanner/tracker', {
			method: 'POST',
			body: JSON.stringify({ userData }),
			headers: { 'Content-Type': 'application/json' },
		  });
		  if (response.ok) {
			console.log(response);
			receiveAPIData();
		  } else {
			alert('No response received');
		  }
	}
}

calculateBtn.addEventListener('click', trackerFormHandler);