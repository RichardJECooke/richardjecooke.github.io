Vue.config.devtools = true;
_app = new Vue
({
	el: '#app',
	data:
	{
		sourceText: ''
	},
	computed:
	{
		targetText: function() { return getTextWithCircumflex(this.sourceText);}
	}
});

function insertString(source, insertThis, index)
{
	return source.substr(0, index) + insertThis + source.substr(index);
}

function handleSourceKeyPress(e)
{
	if (!e.altKey)
		return;
	let newLetter = '';
	const cursorPosition = e.currentTarget.selectionStart;

	//this was inserting the circumflex letter in the source text, which we don't want. rather insert the letter plus x here
	// if (e.key == 'c') newLetter = 'ĉ';
	// if (e.key == 'g') newLetter = 'ĝ';
	// if (e.key == 'h') newLetter = 'ĥ';
	// if (e.key == 'j') newLetter = 'ĵ';
	// if (e.key == 's') newLetter = 'ŝ';
	// if (e.key == 'u') newLetter = 'ŭ';

	// if (e.key == 'C') newLetter = 'Ĉ';
	// if (e.key == 'G') newLetter = 'Ĝ';
	// if (e.key == 'H') newLetter = 'Ĥ';
	// if (e.key == 'J') newLetter = 'Ĵ';
	// if (e.key == 'S') newLetter = 'Ŝ';
	// if (e.key == 'U') newLetter = 'Ŭ';

	if (e.key == 'c') newLetter = 'cx';
	if (e.key == 'g') newLetter = 'gx';
	if (e.key == 'h') newLetter = 'hx';
	if (e.key == 'j') newLetter = 'jx';
	if (e.key == 's') newLetter = 'sx';
	if (e.key == 'u') newLetter = 'ux';

	if (e.key == 'C') newLetter = 'Cx';
	if (e.key == 'G') newLetter = 'Gx';
	if (e.key == 'H') newLetter = 'Hx';
	if (e.key == 'J') newLetter = 'Jx';
	if (e.key == 'S') newLetter = 'Sx';
	if (e.key == 'U') newLetter = 'Ux';

	if (newLetter == '')
		return;
	_app._data.sourceText = insertString(_app._data.sourceText, newLetter, cursorPosition);
	_app.$nextTick( () => {e.currentTarget.setSelectionRange(cursorPosition + 2, cursorPosition + 2)} );
}

function getTextWithCircumflex(text)
{
	let result = text;
	result = result.replace('cx', 'ĉ');
	result = result.replace('gx', 'ĝ');
	result = result.replace('hx', 'ĥ');
	result = result.replace('jx', 'ĵ');
	result = result.replace('sx', 'ŝ');
	result = result.replace('ux', 'ŭ');

	result = result.replace('Cx', 'Ĉ');
	result = result.replace('Gx', 'Ĝ');
	result = result.replace('Hx', 'Ĥ');
	result = result.replace('Jx', 'Ĵ');
	result = result.replace('Sx', 'Ŝ');
	result = result.replace('Ux', 'Ŭ');

	result = result.replace('cX', 'Ĉ');
	result = result.replace('gX', 'Ĝ');
	result = result.replace('hX', 'Ĥ');
	result = result.replace('jX', 'Ĵ');
	result = result.replace('sX', 'Ŝ');
	result = result.replace('uX', 'Ŭ');

	result = result.replace('CX', 'Ĉ');
	result = result.replace('GX', 'Ĝ');
	result = result.replace('HX', 'Ĥ');
	result = result.replace('JX', 'Ĵ');
	result = result.replace('SX', 'Ŝ');
	result = result.replace('UX', 'Ŭ');

	return result;
}

function copy()
{
	try
	{
		document.getElementById('targetTextArea').select();
		document.execCommand('copy');
	}
	catch (e) { /* ignore non-Edge errors */}
	try
	{
		navigator.clipboard.writeText(_app.targetText);
	}
	catch (e) { /* ignore Edge errors */}
}
