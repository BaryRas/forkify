/*jshint esversion: 8 */
import { elements } from '../base';

export const getInput = () => elements.searchInput.value;
export const cleanInput = () => {
    elements.searchInput.value = "";
};

export const clearResult = () => {
    elements.resultsList.innerHTML = "";
    elements.resultButtons.innerHTML = "";
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active'); // select all href include in .results__link

};

/**
 * e.g: "Pasta with tomato and spinach"
 * acc: 0 / acc + cur.lenght = 5 / newTitle = ["pasta"]
 * acc: 5 / acc + cur.lenght = 9 / newTitle = ["pasta", "with"]
 * acc: 9 / acc + cur.lenght = 15 / newTitle = ["pasta", "with", "tomato"]
 * acc: 15 / acc + cur.lenght = 18 / newTitle = ["pasta", "with", "tomato"]
 * acc: 18 / acc + cur.lenght = 24 / newTitle = ["pasta", "with", "tomato"]
 */
export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(" ").reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);

        // return the result
        return `${newTitle.join(" ")} ...`;
    }

    return title;
};

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;

    elements.resultsList.insertAdjacentHTML('beforeend', markup); // beforeend for the right order
};

// Type = "prev" or "next"
const createButton = (page, type) => `
    <button class="btn-inline results__btn--${type}" data-goto=${type === "prev" ? page - 1 : page + 1}>
        <span>Page ${type === "prev" ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === "prev" ? "left" : "right"}"></use>
        </svg>
    </button>
`;

const renderButtons = (page, numResults, resPerPage) => {
    const pages = Math.ceil(numResults / resPerPage);
    let button;

    if (page === 1 && pages > 1) {
        // Only button to go to next page
        button = createButton(page, "next");
    } else if (page < pages){
        // Both buttons
        button = `
            ${createButton(page, "prev")} 
            ${createButton(page, "next")}
        `;
    } else if (page === pages && pages > 1) {
        // Only button to go to prev page
        button = createButton(page, "prev");
    }

    elements.resultButtons.insertAdjacentHTML("afterbegin", button);
};

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of currente page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination buttons
    renderButtons(page, recipes.length, resPerPage);
};

