module.exports = function(contents) {

	this.cacheable();

	var file = [this.context.split('/').pop(), this.resourcePath.split('/').pop()].join('/');

	var result = require('./jswrap')(contents, file, this.options.trycatchHandler || 'console.error(e)');

	return result;
};