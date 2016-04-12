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