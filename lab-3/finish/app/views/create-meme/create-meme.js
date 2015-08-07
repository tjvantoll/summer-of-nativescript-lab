var observable = require("data/observable");
var viewModel = new observable.Observable();
var page;
var originalImage;
var imageManipulation = require("../../shared/image-manipulation/image-manipulation");
var _ = require("lodash");
var socialShare = require("nativescript-social-share");

exports.loaded = function(args) {
	page = args.object;
	page.bindingContext = viewModel;
};
exports.navigatedTo = function() {
	originalImage = page.navigationContext;
	viewModel.set("memeImage", page.navigationContext);
	viewModel.addEventListener(observable.Observable.propertyChangeEvent, function(changes) {
		if (changes.propertyName === "memeImage") {
			return;
		}
		generateImage();
	});
};

var generateImage = _.debounce(function() {
	var image = imageManipulation.addText({
		image: originalImage,
		topText: viewModel.get("topText"),
		bottomText: viewModel.get("bottomText"),
		fontSize: viewModel.get("fontSize"),
		isBlackText: viewModel.get("isBlackText")
	});
	viewModel.set("memeImage", image);
}, 1000, { leading: true });

exports.share = function() {
	socialShare.shareImage(viewModel.get("memeImage"));
}