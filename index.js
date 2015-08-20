module.exports = function (contents) {

	var context = this.context.split('/').pop(),
		fileName = this.resourcePath.split('/').pop();

    var result = require('./jswrap')(contents, 'console.error("' + [context, fileName].join('/') + '", e)');
    
    return result
};