const loginBtn = document.querySelector('#login-btn');
const signUpBtn = document.querySelector('#signup-btn');
const calorieBtn = document.querySelector('#calorie-tracker');
const nutritionBtn = document.querySelector('#nutrition-analysis');
const recipeBtn = document.querySelector('#recipes');

function redirectToLogin() {
    document.location.replace('/login');
}

function redirectToSignUp() {
    document.location.replace('/signup');
}

function redirectToCalorieTracker() {
    document.location.replace('/calorie-tracker');
}

function redirectToNutritionAnalysis() {
    document.location.replace('/nutrition-analysis');
}

function redirectToRecipes() {
    document.location.replace('/recipes');
}

if (loginBtn) {loginBtn.addEventListener('click', redirectToLogin);}
if (signUpBtn) {signUpBtn.addEventListener('click', redirectToSignUp);}
calorieBtn.addEventListener('click', redirectToCalorieTracker);
nutritionBtn.addEventListener('click', redirectToNutritionAnalysis);
recipeBtn.addEventListener('click', redirectToRecipes);