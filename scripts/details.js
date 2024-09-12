import { createCountryDetail } from "./countryAPI.js";

const main = document.querySelector('main');
const knownQueries = Object.freeze({
	country: 'country',
});

if (!hasRelevantQueryParams())
{
	window.location.href = 'index.html';
}
else
{
	const params = new URLSearchParams(window.location.search);

	try
	{
		const response = await fetch(`https://restcountries.com/v3.1/name/${params.get(knownQueries.country)}`);
		if (!response.ok)
			throw new Error(`http: ${response.status}`);
		const data = await response.json();
		createCountryDetail(country[0], main);
	}
	catch (error)
	{
		console.error(error);
	}

}


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
