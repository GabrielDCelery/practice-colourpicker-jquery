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