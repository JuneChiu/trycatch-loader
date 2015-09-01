'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

window.addEventListener('load', function () {
	document.getElementById('tips').addEventListener('click', function () {

		(0, _modal2['default'])('tips', {
			msg: '获取产品详情失败'
		});
	});

	document.getElementById('dialog').addEventListener('click', function () {
		(0, _modal2['default'])('dialog', {
			title: '提示',
			msg: '这是个对话框'
		});
	});
});