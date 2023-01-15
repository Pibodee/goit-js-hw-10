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

  Countries.fetchCountries(name)
    .then(data => {
      console.log(data);
      if (data.length > 10) {
        reset();
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }
      if (data.length <= 10 && data.length >= 2) {
        createList(data);
      }
      if (data.length === 1) {
        createBox(data[0]);
      }
    })
    .catch(error => {
      reset();
      if (error.message === '404') {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      reset();
    });
}

function createList(arr) {
  reset();
  list.innerHTML = arr
    .map(
      country =>
        `<li class = "country-item">
      <img src = "${country.flags.svg}" width = "40px" alt = "${country.name}">
      <h3>${country.name.common}</h3>
    </li>`
    )
    .join('');
}

function createBox(obj) {
  reset();
  const {
    name: { official: offName, common: comName },
    capital,
    population,
    flags,
    languages,
  } = obj;
  const langs = Object.values(languages).join(',');

  box.innerHTML = `<img src="${flags.svg}" width = "300px" alt="${comName}">
    <h3>${offName}</h3>
    <ul class = "card">
      <li><span>Capital: </span>${capital}</li>
      <li><span>Population: </span>${population}</li>
      <li><span>Languages: </span>${langs}</li>
    </ul>`;
}

function reset() {
  list.innerHTML = '';
  box.innerHTML = '';
}
