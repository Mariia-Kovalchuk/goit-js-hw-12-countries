import './sass/main.scss';
import cardMarkup from './templates/country-card.hbs'
import fetchCountries from './js/fetchCountries';
import refs from './js/refs';
import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";
import "@pnotify/confirm/dist/PNotifyConfirm.css";

const debounce = require('lodash.debounce');

refs.input.addEventListener('input', debounce(countrySearch, 1000));

function countrySearch(e) {
    const searchQuery = e.target.value;
    if (searchQuery.length > 0) {
        fetchCountries(searchQuery)
            .then(countriesQueryResultMarkup)
            .catch(errorQuery)
            // .finally(() => e.target.value = '');
    };
};

function countriesQueryResultMarkup(responceList) {
    if (responceList.length > 10) {
        clearCountriesQueryResultMarkup();
        error({
            text: "Too many matches found. Please enter a more specific query!",
            delay: 2000,
        });
    } else if (responceList.length >= 2 && responceList.length <= 10) {
        clearCountriesQueryResultMarkup();
        refs.queryResult.insertAdjacentHTML('beforeend', listMarkup(responceList));
    } else {
        clearCountriesQueryResultMarkup();
        refs.queryResult.insertAdjacentHTML('beforeend', cardMarkup(responceList))
        
    }
};

function errorQuery() {
    refs.queryResult.innerHTML = ' ';
    error({
        text: "No match found. Please check your query!",
        delay: 2000,
    });
};

function listMarkup(list) {
    const li = list.map(el => `<li class='country-name'>${el.name}</li>`).join(' ');
    return `<ul class='country-list'> ${li} </ul>`;
};

function clearCountriesQueryResultMarkup() {
    refs.queryResult.innerHTML = ' ';
};

