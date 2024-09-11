//	https://restcountries.com/v3.1/name/{commonName}

/*
<figure class="country-card small-shadow rounded-corner">
	<a href="#" aria-label='...'>
		<img src="images/co.png" alt="...">
	</a>
	<figcaption aria-label='country info'>
		<h2>Colombia</h2>
		<ul class="no-style" aria-label='additional info'>
			<li><span class="bold-text">Population: </span>88888888888</li>
			<li><span class="bold-text">Region: </span>America</li>
			<li><span class="bold-text">Capital: </span>asldkjaslkdjlsak</li>
		</ul>
	</figcaption>
</figure>
*/

export async function createCard(jsonResponse, container)
{
	if (!jsonResponse || !container)
		return;

	const data = await jsonResponse;

	const cardLink = document.createElement('a');
	cardLink.href = `details.html?country=${data.name.common}`;
	cardLink.setAttribute('aria-label', `View more details about ${data.name.common}.`);

	const countryContainer = document.createElement('figure');
	countryContainer.classList.add('country-card', 'small-shadow', 'rounded-corner');

	const countryFlag = document.createElement('img');
	cardLink.appendChild(countryFlag);
	const countryContext = {
		container:	document.createElement('figcaption'),
		name:		document.createElement('h2'),
		info:		document.createElement('ul'),
	};
	countryContext.name.textContent = data.name.common;
	countryContext.name.id = `country-${data.name.common}`;

	countryContext.container.appendChild(countryContext.name);
	countryContext.container.appendChild(countryContext.info);
	countryContext.container.setAttribute('aria-labelledby', countryContext.name.id);

	countryContext.info.classList.add('no-list-style');
	countryContext.info.appendChild(addPopulationRow(data.population));
	countryContext.info.appendChild(addRegionRow(data.region));
	countryContext.info.appendChild(addCapitalsRow(data.capital));
	countryContext.info.setAttribute('aria-label', `additional info about ${countryContext.name}`);

	countryFlag.src = data.flags.svg;
	countryFlag.alt = (data.flags.alt) ? data.flags.alt : `${data.name.common} flag image.`;

	countryContainer.appendChild(cardLink);
	countryContainer.appendChild(countryContext.container);

	

	container.appendChild(countryContainer);
}

export async function createCountryDetail(jsonResponse, container)
{

}


//	helper functions
function addRegionRow(value)
{
	const row = document.createElement('li');
	const fieldName = document.createElement('span');

	fieldName.classList.add('bold-text');
	fieldName.textContent = `Region: `;
	row.appendChild(fieldName);
	row.appendChild(document.createTextNode(value));

	return (row);
}

function addPopulationRow(value)
{
	let counter = 1;
	let valueArr = `${value}`.split('');
	let i = valueArr.length - 1;
	const row = document.createElement('li');
	const fieldName = document.createElement('span');

	fieldName.classList.add('bold-text');
	fieldName.textContent = `Population: `;
	row.appendChild(fieldName);

	while (i > 0)
	{
		if (counter % 3 == 0)
			valueArr.splice(i, 0, '.');
		counter++;
		i--;
	}

	row.appendChild(document.createTextNode(valueArr.join('')));
	return (row);
}

function addCapitalsRow(capitals)
{
	const row = document.createElement('li');
	const key = document.createElement('span');

	key.classList.add('bold-text');
	key.textContent = `capitals: `;
	row.appendChild(key);
	for (let i = 0; i < capitals.length; i++)
	{
		row.appendChild(document.createTextNode(capitals[i]));
		i++;
		if (i < capitals.length)
			row.appendChild(document.createTextNode(','));
	}

	return (row);
}
