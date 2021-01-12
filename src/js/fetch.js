import debounce from 'lodash.debounce';
import template from "../templates/form.hbs";
import templ from "../templates/country.hbs";
import API from './fetchCountries';
import refs from './refs.js';
import {error} from './notifications.js'
const { input, coutryItem, countryLink } = refs;

input.addEventListener('input', debounce(onInput, 500));

function onInput(evt) {
    clearCountry();
    evt.preventDefault();

    if (!evt.target.value) {
        return;
    }

    API.fetchCountry(input.value)
        .then(renderCountry)
        .catch(onFetchError)
}

function renderedCountry(country) {
    const markups = templ(country)
     countryLink.innerHTML = markups;
}

function renderCountryCard(country) {
    const markup = template(country)
    coutryItem.innerHTML = markup;
}

function onFetchError(error) {
    console.log('ERROR!');
}

function clearCountry() {
    coutryItem.innerHTML = '';
    countryLink.innerHTML = ''
}

function renderCountry(country) {
    if (country.length > 10) {
       error({
  text: 'Too many matches found. Please enter a more specific query!'
       });
    } else if (country.length > 1 && country.length < 11) {
        renderedCountry(country)
    } else if (country.length === 1) {
        renderCountryCard(country)   
    }
}