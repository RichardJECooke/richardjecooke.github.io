`use strict`;

const { DateTime } = require("luxon");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(config)
{
	config.addPlugin(syntaxHighlight);
	config.setTemplateFormats([`adoc`, `html`, `md`, `njk`]);
	addFilters(config);
	addPostYearCollection(config);
	addPassthroughFiles(config);
	setLiquidOptions(config);
	setNunjucksOptions(config);
	return getSettings();
};

function addFilters(config)
{
	//https://moment.github.io/luxon/#/formatting?id=table-of-tokens
	config.addFilter("formatDate", (date) => { return DateTime.fromJSDate(date).toFormat('d MMMM y'); });
	config.addFilter("shortDate", (date) => { return DateTime.fromJSDate(date).toFormat('y-MM-dd'); });
}

function addPostYearCollection(config)
{
	config.addCollection("postsByYear", (collection) =>
	{
		const posts = collection.getFilteredByTag('post').reverse();
		const years = posts.map(post => post.date.getFullYear());
		const uniqueYears = [...new Set(years)];
		const postsByYear = [];
		uniqueYears.map
		(
			(currentYear) =>
			{
				const postsThisYear = posts.filter(post => post.date.getFullYear() === currentYear);
				postsByYear.push([currentYear, postsThisYear]);
			}
		);
		return postsByYear;
	});
}

function getSettings()
{
	const settings =
	{
		markdownTemplateEngine: `njk`, //set default template engine to mozilla nunjucks
		dataTemplateEngine: `njk`,
		htmlTemplateEngine: `njk`,
		dir:
		{
			input: `./src`,
			output: `./docs`
		}
	};
	return settings;
}

function addPassthroughFiles(config)
{
	//admin files
	config.addPassthroughCopy(`./src/.nojekyll`); //stops github using jekyll on the files
	config.addPassthroughCopy(`./src/_media/`); // you can't copy something twice, i.e. with a folder and a wildcard below
	//images
	config.addPassthroughCopy(`**/articles/**/*.bmp`);
	config.addPassthroughCopy(`**/articles/**/*.gif`);
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

function setNunjucksOptions(config)
{
	config.setNunjucksEnvironmentOptions
	(
		{
			autoescape: false,
			throwOnUndefined: true,
			trimBlocks: true
		}
	);
}