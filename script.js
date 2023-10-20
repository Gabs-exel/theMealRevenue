function showTab(tabId) {
    const tabs = ['random', 'search'];
    tabs.forEach(tab => {
        const tabContent = document.getElementById(`${tab}Tab`);
        if (tab === tabId) {
            tabContent.style.display = 'flex';
            if (tab === 'search') {
                document.getElementById('searchBar').style.display = 'flex';
                document.getElementById('btn').style.display = 'none';
            } else {
                document.getElementById('searchBar').style.display = 'none';
                document.getElementById('btn').style.display = 'block';
                if (tab === 'random' && tabContent.innerHTML === '') {
                    getRandomRecipe();
                }
            }
        } else {
            tabContent.style.display = 'none';
        }
    });
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (searchTerm !== '') {
        searchRecipes(searchTerm);
    } else {
        alert('Please enter a valid search term.');
    }
}

function getRandomRecipe() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const randomTabContent = document.getElementById('randomTab');
            randomTabContent.innerHTML = '';
            displayRecipe(data.meals[0], 'randomTab');
        })
        .catch(error => console.error('Error getting random recipe:', error));
}

function searchRecipes(query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
        .then(response => response.json())
        .then(data => {
            const recipes = data.meals;
            const tabContent = document.getElementById('searchTab');
            tabContent.innerHTML = '';
            if (recipes) {
                recipes.slice(0, 5).forEach(recipe => displayRecipe(recipe, 'searchTab'));
            } else {
                tabContent.innerHTML = '<p>No recipes found.</p>';
            }
        })
        .catch(error => console.error('Error when searching for recipes:', error));
}

function displayRecipe(recipe, tabId) {
    const tabContent = document.getElementById(tabId);
    const recipeCard = document.createElement('div');
    recipeCard.classList.add('recipe-card');
    recipeCard.innerHTML = `
        <h2>${recipe.strMeal}</h2>
        <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
        <p>${recipe.strInstructions}</p>
    `;
    tabContent.appendChild(recipeCard);
}

document.addEventListener('DOMContentLoaded', () => {
    const tabs = ['random', 'search'];
    tabs.forEach(tab => {
        const tabElement = document.getElementById(`${tab}Tab`);
        tabElement.addEventListener('click', () => showTab(tab));
    });

    showTab('random');
});
