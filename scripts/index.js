//	https://restcountries.com/v3.1/name/{commonName}

import { createCard } from "./countryAPI.js";

const main = document.querySelector('main');
const knownQueries = Object.freeze({
	country: 'country',
	region: 'region',
});


if (hasRelevantQueryParams())
{
	loadQuery();
}
else
{
	loadDefault();
}


async function loadDefault()
{
	const defaultCountries = [
		'germany', 'usa', 'brasil', 'iceland',
		'afghanistan', 'aland', 'albania', 'algeria',
	];

	for (const country of defaultCountries)
	{
		try
		{
			const response = await fetch(`https://restcountries.com/v3.1/name/${country}`);
			if (!response.ok)
				throw new Error(`http: ${response.status}`);
			const data = await response.json();
			createCard(data[0], main);
		}
		catch (error)
		{
			console.error(error);
		}
	}
}

async function loadQuery()
{
	let data;

	try
	{
		const response = await fetch(`https://restcountries.com/v3.1/all`);
		if (!response.ok)
			throw new Error(`http: ${response.status}`);
		data = await response.json();
	}
	catch (error)
	{
		console.error(error);
	}

	const params = new URLSearchParams(window.location.search);
	const searchByCountryName = params.get(knownQueries.country);
	const searchByCountryRegion = params.get(knownQueries.region);

	for (const country of data)
	{
		if (searchParser(country, searchByCountryName, searchByCountryRegion))
		{
			createCard(country, main);
		}
	}
}

/*fetch('https://restcountries.com/v3.1/name/brasil')
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
});*/



//	helper functions
function hasRelevantQueryParams()
{
	const url = window.location.search;
	const params = new URLSearchParams(url);

	for (const query in knownQueries)
	{
		if (params.get(knownQueries[query]))
			return true;
	}
	return false;
}

function searchParser(country, countryName, countryRegion)
{
	if (!country)
		return false;
	if (countryRegion && countryName)
	{
		return (country.name.common.toLowerCase().startsWith(countryName.toLowerCase())
				&& country.region.toLowerCase().startsWith(countryRegion.toLowerCase())
		); 
	}
	else if (countryRegion)
	{
		return (country.region.toLowerCase().startsWith(countryRegion.toLowerCase()));
	}
	else if (countryName)
	{
		return (country.name.common.toLowerCase().startsWith(countryName.toLowerCase()));
	}
	return false;
}