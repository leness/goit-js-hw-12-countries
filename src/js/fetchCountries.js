function fetchCountry(name) {
    const url = `https://restcountries.eu/rest/v2/name/${name}`;
    return fetch(url)
    .then((r) => r.json())
}

export default { fetchCountry };

