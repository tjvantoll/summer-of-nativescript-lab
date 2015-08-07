var observableModule = require("data/observable");
var navigation = require( "../../shared/navigation");

var _viewData = new observableModule.Observable();
var _page;
var _delay = 100;

exports.load = function(args) {
	_viewData.set("imageSource", "~/images/splashScreenBackground.png");
	_viewData.set("appVersion", global.appVersion);

	_page = args.object;
	_page.bindingContext = _viewData;
	navigateHome();
};

function navigateHome() {
	setTimeout(function () {
		navigation.goHome();
	}, _delay);
}
