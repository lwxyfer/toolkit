// function ale() {
// 	console.log('commonjs')
// }

(function(window, factory) {
	if (typeof exports === 'object') {

		module.exports = factory;
	} else if (typeof define === 'function' && define.amd) {

		define(factory);
	} else {

		window.eventUtil = factory;
	}
})(this, function() {

	console.log('commonjs')

});