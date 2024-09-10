//	https://restcountries.com/v3.1/name/{commonName}

import { createCard } from "./countryAPI.js";

const main = document.querySelector('main');

fetch('https://restcountries.com/v3.1/name/brasil')
.then(response => {
	if (!response.ok)
		throw new Error(`http code: ${response.status}`);
	return response.json();
})
.then(data => {
	for (let i = 0; i < 8; i++)
		createCard(data, main);
})
.catch(error =>{
	console.log(error);
});

