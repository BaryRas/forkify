/*jshint esversion: 8 */
// Global app controller
import { elements, renderLoader, clearLoader } from './base';
import Search from './models/Search';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import Recipe from './models/Recipe';

/**
 * SEARCH CONTROLLER
 */

/** Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};


const controlSearch = async () => {
    // 1- Get query from view
    const query = searchView.getInput();

    if (query) {
        // 2- New search object and add to state
        state.search = new Search(query);

        // 3- Prepare UI for results
        searchView.cleanInput();
        searchView.clearResult();
        renderLoader(elements.resultsSection);

        try {

            // 4- Search for recepies
            await state.search.getResult();
            
    
            // 5- Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);
        } catch (err) {
            alert("Something wrong with the search...");
            clearLoader();
        }

    }
};

elements.searchControl.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.resultButtons.addEventListener("click", e => {
    const btn = e.target.closest(".btn-inline");
    
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResult();
        searchView.renderResults(state.search.result, goToPage);
    }
});


/**
 * MODEL CONTROLLER
 * 
 * - How to read data from the page url
 * - How to respond to the HASHCHANGE event
 * - How to add the same event listener to multiple events
 */ 


 const controlRecipe = async () => {
    // Get Id from url
    const id = window.location.hash.replace("#", "");

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // Highlight selected search item
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);


        try {

            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            console.log(state.recipe);
            state.recipe.parseIngredients();
    
            // Calculate serving and time
            state.recipe.calcTime();
            state.recipe.calcServings(); 
    
            // Render recipe
            clearLoader();
            recipeView.renderRecipe(state.recipe);
            

        } catch (err) {
            alert("Error processing recipe!");
        }
    }
 };

//  window.addEventListener("hashchange", controlRecipe);
//  window.addEventListener("load", controlRecipe); reload the in the last page not an empty page

 ["hashchange", "loader"].forEach(event => window.addEventListener(event, controlRecipe));


 // Handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) { // * means all child
        // Decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // Increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        // Add ingredients to shopping list
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        // Like controller
        controlLike();
    }
});