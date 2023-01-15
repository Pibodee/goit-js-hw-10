function fetchCountries(value) {
  const BASE_URL = 'https://restcountries.com/v3.1/name/';
  const OPTIONS = '?fields=name,capital,population,flags,languages';
  return fetch(`${BASE_URL}${value}${OPTIONS}`).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.status)      
    }
    return resp.json();
  });
}

export default { fetchCountries };
