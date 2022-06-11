`use strict`;

const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(config)
{
	config.addPlugin(syntaxHighlight);
	config.setTemplateFormats([`adoc`, `html`, `md`]);
	addFilters(config);
	addPassthroughFiles(config);
	setLiquidOptions(config);
	return getFolderSetup();
};

function addFilters(config)
{
	//https://moment.github.io/luxon/#/formatting?id=table-of-tokens
	config.addFilter("formatDate", (date) => { return DateTime.fromJSDate(date).toFormat('d MMMM y'); });
}

function getFolderSetup()
{
	const folderSetup =
	{
		dir:
		{
			input: `./src`,
			output: `./docs`
		}
	};
	return folderSetup;
}

function addPassthroughFiles(config)
{
	//admin files
	config.addPassthroughCopy(`./src/.nojekyll`); //stops github using jekyll on the files
	config.addPassthroughCopy(`./src/media/`); // you can't copy something twice, i.e. with a folder and a wildcard below
	// //images
	config.addPassthroughCopy(`**/articles/**/*.bmp`);
	config.addPassthroughCopy(`**/articles/**/*.jpeg`);
	config.addPassthroughCopy(`**/articles/**/*.jpg`);
	config.addPassthroughCopy(`**/articles/**/*.png`);
	config.addPassthroughCopy(`**/articles/**/*.svg`);
	config.addPassthroughCopy(`**/articles/**/*.webp`);
	//audio
	config.addPassthroughCopy(`**/articles/**/*.flac`);
	config.addPassthroughCopy(`**/articles/**/*.mp3`);
	//books
	config.addPassthroughCopy(`**/articles/**/*.pdf`);
	config.addPassthroughCopy(`**/articles/**/*.epub`);
	//downloads
	config.addPassthroughCopy(`**/articles/**/*.zip`);
}

function setLiquidOptions(config)
{
	config.setLiquidOptions
	(
		{
			dynamicPartials: true // use {% include with a quoted " filename "
		}
	);
}