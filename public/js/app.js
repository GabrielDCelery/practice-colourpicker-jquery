console.log('api module is running...');

var apiModule = (function(){

	function getBasePalette(callback){
		$.getJSON('https://qbs.arkonline.co.uk/task/colours.json?task=1', callback)
	}

	function getExtendedPalette(callback){
		$.getJSON('https://qbs.arkonline.co.uk/task/colours.json?task=2', callback)
	}

	return {
		getBasePalette: getBasePalette,
		getExtendedPalette: getExtendedPalette
	}

})()
console.log('data manipulator module is running...')

var colourModule = (function(){

	function rgbNumberToHex(rgbNumber) {
		var hex = rgbNumber.toString(16);
		return hex.length == 1 ? '0' + hex : hex;
	}

	function rgbToHex(array){
		return '#' + rgbNumberToHex(array[0]) + rgbNumberToHex(array[1]) + rgbNumberToHex(array[2]);
	}

	function tintCalculator(rbgColour, tint){
		var modifiedRbgColour = [];
		for(var i = 0; i < 3; i++){
			var modifiedRbgValue = rbgColour[i] + tint[i];
			if(modifiedRbgValue < 0){
				modifiedRbgValue = 0;
			}
			if(modifiedRbgValue > 255){
				modifiedRbgValue = 255;
			}
			modifiedRbgColour[i] = modifiedRbgValue;
		}
		return modifiedRbgColour;
	}

	return {
		rgbToHex: rgbToHex, 
		tintCalculator: tintCalculator
	}

}())
console.log('html module is running...');

var htmlModule = (function(){

	function generateMonochromatic(data){
		var html = '';

		html += '<li id="' + data.name + '" class="monochromatic">';
		html += '<div class="colourValueBox">';
		html += '<div class="baseColourValues">';
		html += '<p class="rgbaValue">' + data.baseColour[0] + ',' + data.baseColour[1] + ',' + data.baseColour[2] + ',1</p>';
		html += '<p class="hexValue">' + colourModule.rgbToHex(data.baseColour) + '</p>';
		html += '</div>';
		html += '</div>';
		html += '<div class="colourBox">';
		html += '<div class="baseColour" style="background-color: rgba(' + data.baseColour[0] + ',' + data.baseColour[1] + ',' + data.baseColour[2] + ',1);"></div>';
		html += '</div>';
		html += '<div class="colourBox">';
		for(var i = 0; i < data.tints.length; i++){
			var tintedColour = colourModule.tintCalculator(data.baseColour, data.tints[i]);
			html += '<div class="tintColour" style="background-color: rgba(' + tintedColour[0] + ' ,' + tintedColour[1] + ',' + tintedColour[2] + ',1);"></div>';
		}
		html += '</div>';
		html += '<div class="colourValueBox">';
		for(var j = 0; j < data.tints.length; j++){
			var tintedColour = colourModule.tintCalculator(data.baseColour, data.tints[j]);
			html += '<div class="tintColourValues">';
			html += '<p class="rgbaValue">' + tintedColour[0] + ',' + tintedColour[1] + ','+ tintedColour[2] + ',1</p>';
			html += '<p class="hexValue">' + colourModule.rgbToHex(tintedColour) + '</p>';
			html += '</div>';
		}
		html += '</div>';
		html += '</li>';

		return html;
	}

	return {
		generateMonochromatic: generateMonochromatic
	}

})()
console.log('render module is running...');

var renderModule = (function(){

/*************************************************************
SELECTORS
*************************************************************/

var $getBasePaletteNavButton = $('#getBasePalette');
var $getExtendedPaletteNavButton = $('#getExtendedPalette');
var $paletteContainer = $('main ul');

/*************************************************************
FUNCTION
*************************************************************/

function renderPalette(jsonData){
	var html = '';
	for(var i = 0; i < jsonData.length; i++){
		html += htmlModule.generateMonochromatic(jsonData[i]);
	}
	$paletteContainer.html(html);
}

function renderBasePalette(){
	apiModule.getBasePalette(function(response){
		renderPalette(response);
	})
}

function renderExtendedPalette(){
	apiModule.getExtendedPalette(function(response){
		renderPalette(response);
	})
}

/*************************************************************
EVENT BINDERS
*************************************************************/

$getBasePaletteNavButton.on('click', renderBasePalette);
$getExtendedPaletteNavButton.on('click', renderExtendedPalette);

/*************************************************************
INITIATE FETCHING BASE PALETTE BY DEFAULT
*************************************************************/

renderBasePalette();

})()