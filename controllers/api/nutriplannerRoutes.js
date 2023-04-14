const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();
var apiData;

router.post('/recipes', async (req, res) => {
    try {
        let userData = req.body.userInput;
        console.log(userData);

        const options = {
            method: 'GET',
            url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
            params: {
              query: userData.query,
              cuisine: userData.cuisine,
              maxReadyTime: userData.maxReadyTime,
              type: userData.type,
              minCalories: userData.minCalories,
              maxCalories: userData.maxCalories,
              number: '10', // default value for number
              ranking: '2' // default value for ranking
            },
            headers: {
              'X-RapidAPI-Key': process.env.APIKEY_RECIPE, //'3d5db3c0abmsh320832ed35d8ba3p126149jsne027b3581b02'
              'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
            }
          };

          axios.request(options).then(function (response) {
            apiData = response.data;
            res.status(200).json(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/recipes', (req, res) => {
    try {
        res.status(200).json(apiData);
    } catch (err) {
        console.log(err);
    }
});

router.post('/analysis', async (req, res) => {
    try {
        let userData = req.body.userInput;
        console.log(userData);
        const url = 'https:api.edamam.com/api/nutrition-data';
        const query = `app_id=${process.env.ID_ANALYSIS}&app_key=${process.env.APIKEY_ANALYSIS}&ingr=${userData}`;

        await fetch(`${url}?${query}`)
        .then( response => {
            response.json()
            .then( data => {
                console.log(data);
                apiData = data;
                res.status(200).json(data);
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/analysis', (req, res) => {
    try {
        res.status(200).json(apiData);
    } catch (err) {
        console.log(err);
    }
});

router.post('/tracker', async (req, res) => {
    try {
        let centimeters = req.body.centimeters;
        let kilograms = req.body.kilograms;
        let age = req.body.userAge;

        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.APIKEY_TRACKER,
                'X-RapidAPI-Host': 'calorie-calculator.p.rapidapi.com'
            }
        };

        await fetch(`https://calorie-calculator.p.rapidapi.com/caloriecalculator.php?age=${age}%3CREQUIRED%3E&height=${centimeters}%3CREQUIRED%3E&weight=${kilograms}%3CREQUIRED%3E`, options)
	    .then(response => {
            response.json().then( data => {
                console.log(data);
                apiData = data;
                res.status(200).json(data);
            })
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/tracker', (req, res) => {
    try {
        res.status(200).json(apiData);
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;