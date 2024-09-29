// Project description can be found in my README.md

document.getElementById('searchButton').addEventListener('click', getAndDisplayMealData);

function getAndDisplayMealData() {
    // Get the user input ingredient from the search box
    let ingredient = document.getElementById('ingredient').value;
    // Make a web request using axios to the MealDB API using the user's input ingredient
    axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)
        .then(response => {
            console.log(response.data);
            // Set the entire response array of data to mealData
            let mealData = response.data.meals;
            // Assign the results div to a variable
            let resultsDiv = document.getElementById('results');
            // Clear the results div
            resultsDiv.innerHTML = '';
            // Loop through the mealData array
            for (let meal of mealData) {
                // Fetch detailed information for each meal
                axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                    .then(detailResponse => {
                        let mealDetails = detailResponse.data.meals[0];
                        // Create a div DOM element for each meal
                        let mealDiv = document.createElement('div');
                        // Set the inner HTML of the meal div
                        mealDiv.innerHTML = `
                            <h2>${mealDetails.strMeal}</h2>
                            <img src="${mealDetails.strMealThumb}" alt="${mealDetails.strMeal}">
                            <p>${mealDetails.strInstructions}</p>
                        `;
                        // Add the meal div to the results div
                        resultsDiv.appendChild(mealDiv);
                    })
            }
        })
}
