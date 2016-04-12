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