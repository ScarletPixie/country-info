const themeSwitch = document.querySelector(".theme-switch-bt");
const eventHandler = switchTheme();
themeSwitch.addEventListener('click', eventHandler);


function switchTheme()
{
	let mode = 0;
	const initialMode = window.matchMedia('prefers-color-scheme: dark');

	if (initialMode.matches)
		initialMode = 1;

	const setThemes = [
		//	light
		() => {
			document.documentElement.style.setProperty('--icon-path', "url('../images/moon-dark.png')");
			document.documentElement.style.setProperty('--shadow-color', 'rgb(207, 207, 207)');
			document.documentElement.style.setProperty('--bg-color', '#FAFAFA');
			document.documentElement.style.setProperty('--nav-bg-color', 'white');
			document.documentElement.style.setProperty('--text-color', 'black');
		},
		//	dark
		() => {
			document.documentElement.style.setProperty('--icon-path', "url('../images/moon-light.png')");
			document.documentElement.style.setProperty('--shadow-color', 'rgb(29, 29, 32)');
			document.documentElement.style.setProperty('--bg-color', '#202d36');
			document.documentElement.style.setProperty('--nav-bg-color', '#2b3743');
			document.documentElement.style.setProperty('--text-color', 'white');
		},
	];
	return () => {
		mode = Number(!mode);
		setThemes[mode]();
	};
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