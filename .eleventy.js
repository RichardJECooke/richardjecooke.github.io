`use strict`;

module.exports = function(config)
{
	config.setTemplateFormats([`adoc`, `html`, `md`]);
	addPassthroughFiles(config);
	setLiquidOptions(config);
	return getFolderSetup();
};

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
	// style
	// config.addPassthroughCopy(`**/*.css`);
	// //images
	// config.addPassthroughCopy(`**/*.bmp`);
	// config.addPassthroughCopy(`**/*.jpeg`);
	// config.addPassthroughCopy(`**/*.jpg`);
	// config.addPassthroughCopy(`**/*.png`);
	// config.addPassthroughCopy(`**/*.svg`);
	// config.addPassthroughCopy(`**/*.webp`);
	// //audio
	// config.addPassthroughCopy(`**/*.flac`);
	// config.addPassthroughCopy(`**/*.mp3`);
	// //books
	// config.addPassthroughCopy(`**/*.pdf`);
	// config.addPassthroughCopy(`**/*.epub`);
	// //downloads
	// config.addPassthroughCopy(`**/*.zip`);
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