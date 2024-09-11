applyTheme();
const button = document.querySelector(".theme-switch-bt");

if (button)
{
	const throlledThemeSwitch = switchTheme(50);
	button.addEventListener('click', throlledThemeSwitch);
}

function switchTheme(switchDelayMs)
{
	let mode = 0;
	let timer = null;
	if (!document.cookie)
	{
		document.cookie = `theme=${(window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'}; SameSite=Lax; Secure;`;
	}

	mode = (document.cookie.split('=')[1] === 'dark') ? 1 : 0;
	
	console.log(document.cookie,' ', mode);

	const setThemes = [lightTheme, darkTheme];

	return () => {
		if (timer)
			return;
		timer = setTimeout(() => { timer = null; }, switchDelayMs);
		mode = Number(!mode);
		setThemes[mode]();
		document.cookie = `theme=${mode ? 'dark' : 'light'}; SameSite=Lax; Secure;`;
	};
}

function applyTheme()
{
	let mode = 0;
	if (!document.cookie)
	{
		document.cookie = `theme=${(window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'}; SameSite=Lax; Secure;`;
	}

	(document.cookie.split('=')[1] === 'dark') ? darkTheme() : lightTheme();
}

function darkTheme()
{
	document.documentElement.style.setProperty('--icon-path', "url('../images/moon-light.png')");
	document.documentElement.style.setProperty('--shadow-color', 'rgb(29, 29, 32)');
	document.documentElement.style.setProperty('--bg-color', '#202d36');
	document.documentElement.style.setProperty('--nav-bg-color', '#2b3743');
	document.documentElement.style.setProperty('--text-color', 'white');
}

function lightTheme()
{
	document.documentElement.style.setProperty('--icon-path', "url('../images/moon-dark.png')");
	document.documentElement.style.setProperty('--shadow-color', 'rgb(207, 207, 207)');
	document.documentElement.style.setProperty('--bg-color', '#FAFAFA');
	document.documentElement.style.setProperty('--nav-bg-color', 'white');
	document.documentElement.style.setProperty('--text-color', 'black');
}

/*
@media (prefers-color-scheme: dark)
{
	:root
	{
		--icon-path: url('../images/moon-light.png');
		--shadow-color:  rgb(29, 29, 32);
		--bg-color: #202d36;
		--nav-bg-color: #2b3743;
		--text-color: white;
	}
}

@media (prefers-color-scheme: light)
{
	:root
	{
		--icon-path: url('../images/moon-dark.png');
		--shadow-color:  rgb(207, 207, 207);
		--text-color: black;
		--bg-color: #FAFAFA;
		--nav-bg-color: white;
	}
}
*/