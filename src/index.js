import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import Countries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const name = input.value.trim();

  Countries.fetchCountries(name).then(data => {
    console.log(data);
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    } else if (data.length <= 10 && data.length >= 2) {
      createList(data);
    }
  });

  console.log(`${BASE_URL}${name}`);
}

function createList(countryList) {
  list.innerHTML = countryList
    .map(country => 
      `<li>
      <img src = "${country.flags.svg}" width = "24px" alt = "${country.name}">
      <h3>${country.name.common}</h3>
    </li>`)
    .join('');
}
