function fetchCountries(value) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const OPTIONS = '?fields=name,capital,population,flag,languages';
  return fetch(`${BASE_URL}${value}${OPTIONS}`).then(resp => {
    if (!resp.ok) {
      throw new Error(
        Notiflix.Notify.failure('Oops, there is no country with that name')
      );
    }
    console.log(resp);
    return resp.json();
  });
}

export default {fetchCountries}