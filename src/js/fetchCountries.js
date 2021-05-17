const BASE_URL = 'https://restcountries.eu/rest/v2';

function fetchCountries(searchQuery) {
    return fetch(`${BASE_URL}/name/${searchQuery}`).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Something went wrong');
        };
    });
};

export default fetchCountries;