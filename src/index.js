import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import Countries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const box = document.querySelector('.country-info');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const name = input.value.trim();

  Countries.fetchCountries(name).then(data => {
    console.log(data);
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
        )
      };
    if (data.length <= 10 && data.length >= 2) {
      createList(data);
      };
      if (data.length === 1) {
        createBox(data[0])
    }      
  });

  console.log(`${BASE_URL}${name}`);
}

function createList(arr) {
    clearFields();
  list.innerHTML = arr
    .map(country => 
      `<li class = "country-item">
      <img src = "${country.flags.svg}" width = "40px" alt = "${country.name}">
      <h3>${country.name.common}</h3>
    </li>`)
    .join('');
}

function createBox(obj) {
    clearFields();
    box.innerHTML = `<img src="${obj.flags.svg}" alt="${obj.name}">
    <h3>${obj.name}</h3>
    <ul>
      <li><span>Capital: </span>${obj.capital}</li>
      <li><span>Population: </span>${obj.population}</li>
      <li><span>Languages: </span>${obj.languages}</li>
    </ul>`;
}

function clearFields() {
    list.innerHTML = '';
    box.innerHTML = '';
}