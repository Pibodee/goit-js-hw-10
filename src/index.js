import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import Countries from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput() {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const name = input.value.trim();

  Countries.fetchCountries(name).then(data => {
    if (data.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }
  });

  console.log(`${BASE_URL}${name}`);
}

