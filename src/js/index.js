/*jshint esversion: 8 */
// Global app controller
import { elements, renderLoader, clearLoader } from './base';
import Search from './models/Search';
import * as searchView from './views/searchView';

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

        // 4- Search for recepies
        await state.search.getResult();

        // 5- Render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);

    }
};

elements.searchControl.addEventListener('submit', e => {
    e.preventDefault();
    console.log("I run mother fucker");
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