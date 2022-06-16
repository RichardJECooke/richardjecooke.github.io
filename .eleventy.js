`use strict`;

const { DateTime } = require("luxon");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function(config)
{
	addPlugins(config);
	config.setTemplateFormats([`adoc`, `html`, `md`, `njk`]);
	addIgnores(config);
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

function addIgnores(config)
{
	config.ignores.add(".eleventy.js");
	config.ignores.add("node_modules");
	config.ignores.add("package.json");
	config.ignores.add("README.md");
	config.ignores.add("docs");
	config.ignores.add("docs/");
	config.ignores.add("docs/**");
}

function addPlugins(config)
{
	config.addPlugin(syntaxHighlight);
	config.addPlugin(pluginRss);
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
	config.addPassthroughCopy(`./src/articles/**/*.bmp`);
	config.addPassthroughCopy(`./src/articles/**/*.gif`);
	config.addPassthroughCopy(`./src/articles/**/*.jpeg`);
	config.addPassthroughCopy(`./src/articles/**/*.jpg`);
	config.addPassthroughCopy(`./src/articles/**/*.png`);
	config.addPassthroughCopy(`./src/articles/**/*.svg`);
	config.addPassthroughCopy(`./src/articles/**/*.webp`);

	config.addPassthroughCopy(`./src/cv/*.bmp`);
	config.addPassthroughCopy(`./src/cv/*.gif`);
	config.addPassthroughCopy(`./src/cv/*.jpeg`);
	config.addPassthroughCopy(`./src/cv/*.jpg`);
	config.addPassthroughCopy(`./src/cv/*.png`);
	config.addPassthroughCopy(`./src/cv/*.svg`);
	config.addPassthroughCopy(`./src/cv/*.webp`);

	//audio
	config.addPassthroughCopy(`./src/music/**/*.flac`);
	config.addPassthroughCopy(`./src/music/**/*.mp3`);
	//books
	config.addPassthroughCopy(`./src/music/**/*.pdf`);
	config.addPassthroughCopy(`./src/music/**/*.pdf`);
	config.addPassthroughCopy(`./src/articles/**/*.pdf`);
	config.addPassthroughCopy(`./src/articles/**/*.epub`);
	//downloads
	config.addPassthroughCopy(`./src/articles/**/*.zip`);
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