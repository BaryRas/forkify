/*jshint esversion: 8 */

export const elements = {
    // Search field
    searchControl: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchButton: document.querySelector('.search__btn'),
    searchIcon: document.querySelector('.search__icon'),


    // Result section
    resultsSection: document.querySelector('.results'),
    resultsList: document.querySelector('.results__list'),
    resultButtons: document.querySelector('.results__pages')
};

export const elementStrings = {
    loader: "loader"
};

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader);
};
