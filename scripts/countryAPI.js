//	https://restcountries.com/v3.1/name/{commonName}
//	https://restcountries.com/v3.1/alpha/{countryCode}


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
/*
<div aria-labelledby="flag">
	<img src="images/co.png" alt="colombia flag" id="flag">
</div>
<section aria-label="information about colombia">
	<h2 id="country-name">Colombia</h2>
	<ul aria-labelledby="country-name" class="no-list-style country-info">
		<li>
			<ul class="no-list-style information-entry">
				<li><span class="bold-text">Native Name: </span>Belge</li>
				<li><span class="bold-text">Population: </span>11.319.511</li>
				<li><span class="bold-text">Region: </span>Europe</li>
				<li><span class="bold-text">Sub Region: </span>Western Europe</li>
				<li><span class="bold-text">Capital: </span>Brussels</li>
			</ul>
		</li>
		<li>
			<ul class="no-list-style information-entry">
				<li><span class="bold-text">Top Level Domain: </span>.be</li>
				<li><span class="bold-text">Currencies: </span>Euro</li>
				<li><span class="bold-text">Languages: </span>Dutch, French, German</li>
			</ul>
		</li>
	</ul>
	<section class="border-countries-section" aria-labelledby="border-countries" id="border-countries-section">
		<h3 id="border-countries">border countries:</h3>
		<ul class="no-list-style border-countries-list" aria-labelledby="border-countries">
			<li>
				<a href="#" class="bt-like no-link-decoration">France</a>
			</li>
			<li>
				<a href="#" class="bt-like no-link-decoration">Germany</a>
			</li>
			<li>
				<a href="#" class="bt-like no-link-decoration">Netherlands</a>
			</li>
		</ul>
	</section>
</section>
*/

export async function createCountryDetail(jsonResponse, container)
{
	if (!jsonResponse || !container)
		return;

	const country = await jsonResponse;

	console.log(country);
	const flag = createFlagContainer(country.flags.svg, country.flags.alt);

	const infoSection = document.createElement('section');
	const infoSectionHeading = document.createElement('h2');
	const infoSectionList = document.createElement('ul');
	const infoSectionBorderList = document.createElement('section');
	const inforSectionBorderListHeading = document.createElement('h3');

	//	container
	container.appendChild(flag);
	container.appendChild(infoSection);

	//	infoSection
	infoSection.setAttribute('aria-label', `information about ${country.name.common}`);
	infoSection.appendChild(infoSectionHeading);
	infoSection.appendChild(infoSectionList);
	infoSection.appendChild(infoSectionBorderList);

	//	inforSectionHeading
	infoSectionHeading.appendChild(document.createTextNode(country.name.common));
	infoSectionHeading.id = 'country-name';

	//	infoSectionList
	infoSectionList.appendChild(getCountryInfo(country));
	infoSectionList.appendChild(getCountryEconomicsInfo(country));
	infoSectionList.classList.add('no-list-style', 'country-info');
	infoSectionList.setAttribute("aria-labelledby", "country-name");

	//	inforSectionBorderList (makes API call)
	inforSectionBorderListHeading.appendChild(document.createTextNode('Border Countries:'));
	inforSectionBorderListHeading.id = 'border-countries';
	infoSectionBorderList.appendChild(inforSectionBorderListHeading);
	infoSectionBorderList.appendChild(await getBorderCountries(country.borders));
	infoSectionBorderList.id = "border-countries-section";
	infoSectionBorderList.classList.add("border-countries-section");
	infoSectionBorderList.setAttribute('aria-labelledby', 'border-countries');
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
	key.textContent = `Capital${(capitals.length > 1) ? 's' : ''}: `;
	row.appendChild(key);
	for (let i = 0; i < capitals.length; i++)
	{
		row.appendChild(document.createTextNode(capitals[i]));
		i++;
		if (i < capitals.length)
			row.appendChild(document.createTextNode(', '));
	}

	return (row);
}

function addRow(key, value)
{
	const row = document.createElement('li');
	const contentKey = document.createElement('span');

	contentKey.classList.add('bold-text');
	contentKey.textContent = `${key}: `;

	row.appendChild(contentKey);
	row.appendChild(document.createTextNode(value));

	return (row);
}

//	country-detail specific
function createFlagContainer(src, alt)
{
	const container = document.createElement('div');
	const flag = document.createElement('img');

	flag.src = src;
	flag.alt = alt;
	flag.id = 'flag';

	container.appendChild(flag);
	container.setAttribute('aria-labelledby', 'flag');
	return container;
}

function getCountryInfo(country)
{
	const listEntry = document.createElement('li');
	const informations = document.createElement('ul');

	listEntry.appendChild(informations);

	informations.classList.add("no-list-style", "information-entry");
	informations.appendChild(addRow('Native Name', getLastNativeName(country)));
	informations.appendChild(addPopulationRow(country.population));
	informations.appendChild(addRegionRow(country.region));
	informations.appendChild(addRow('Sub Regions', country.subregion));
	informations.appendChild(addCapitalsRow(country.capital));

	return listEntry;
}

function getCountryEconomicsInfo(country)
{
	const listEntry = document.createElement('li');
	const informations = document.createElement('ul');

	listEntry.appendChild(informations);

	informations.classList.add("no-list-style", "information-entry");
	informations.appendChild(addRow('Top Level Domain', country.tld.join(', ')));
	informations.appendChild(addRow('Currencies', getCurrencies(country.currencies)));
	informations.appendChild(addRow('Languages', getLanguages(country.languages)))

	return listEntry;
}

async function getBorderCountries(borders)
{
	let countries = [];
	const borderList = document.createElement('ul');

	borderList.classList.add("no-list-style", "border-countries-list");
	borderList.setAttribute("aria-labelledby","border-countries");

	try
	{
		const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${borders.join(',')}`);

		if (!response.ok)
		{
			throw new Error(`http: ${response.status}`);
		}

		const data = await response.json();
		for (const country of data)
		{
			countries.push(country.name.common);
		}
	}
	catch (error)
	{
		console.error(error);
		return countries;
	}

	for (const country of countries)
	{
		const entry = document.createElement('li');
		entry.innerHTML = `
			<a href="details.html?country=${country}" class="bt-like no-link-decoration">${country}</a>
		`;
		borderList.appendChild(entry);
	}
	return borderList;
}

function getLastNativeName(country)
{
	let name;

	for (const obj in country.name.nativeName)
	{
		name = country.name.nativeName[obj];
	}
	return name.common;
}

function getCurrencies(objs)
{
	let result = [];

	for (const obj in objs)
	{
		result.push(objs[obj].name);
	}
	return result.join(', ');
}


function getLanguages(objs)
{
	let result = [];

	for (const key in objs)
	{
		result.push(objs[key]);
	}
	return result.join(', ');
}
