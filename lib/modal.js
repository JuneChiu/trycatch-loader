'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styleModalStyl = require('../style/modal.styl');

var _styleModalStyl2 = _interopRequireDefault(_styleModalStyl);

var inlineStyle = {};

var Modal = (function (_React$Component) {
	_inherits(Modal, _React$Component);

	function Modal(props) {
		_classCallCheck(this, Modal);

		_get(Object.getPrototypeOf(Modal.prototype), 'constructor', this).call(this, props);

		// 设置状态强制执行渲染*
		this.state = {
			ready: false,
			destroy: false
		};

		this.close = this.close.bind(this);
	}

	_createClass(Modal, [{
		key: 'close',
		value: function close() {

			this.setState({
				destroy: true
			});

			document.body.classList.remove(_styleModalStyl2['default'].frozen);
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this = this;

			var containerEl = _react2['default'].findDOMNode(this.refs.container);

			var bounds = containerEl.getBoundingClientRect();

			inlineStyle.marginLeft = -bounds.width / 2;

			inlineStyle.marginTop = -bounds.height / 2;

			this.setState({
				ready: true
			});

			document.body.classList.add(_styleModalStyl2['default'].frozen);

			if (this.props.autoClose) {
				setTimeout(function () {
					_this.close();
				}, this.props.autoClose);
			}

			containerEl.addEventListener("transitionend", function (e) {

				var wrapEl = _react2['default'].findDOMNode(_this.refs.wrap);

				// 移除组件
				if (_this.state.destroy && wrapEl) {

					var scopeEl = wrapEl.parentNode;
					_react2['default'].unmountComponentAtNode(scopeEl);

					// 移除真实DOM
					scopeEl.parentNode.removeChild(scopeEl);
				}
			});

			containerEl.addEventListener("click", function (e) {
				var action = e.target.dataset.action;

				switch (action) {
					case 'close':
						_this.close();

						_this.props.cancelCallback && _this.props.cancelCallback();

					case 'confirm':

						if (_this.props.confirmCallback) {
							_this.props.confirmCallback(_this);
						} else {
							_this.close();
						}
				}
			});
		}
	}, {
		key: 'componentWillUnmount',
		value: function componentWillUnmount() {

			this.close();
		}
	}, {
		key: 'render',
		value: function render() {

			return _react2['default'].createElement(
				'div',
				{ ref: 'wrap' },
				_react2['default'].createElement('div', { className: (0, _classnames2['default'])(_styleModalStyl2['default'].mask, { active: this.state.ready && !this.state.destroy }) }),
				_react2['default'].createElement(
					'div',
					{ style: inlineStyle, className: (0, _classnames2['default'])(_styleModalStyl2['default'].container, this.props.className, { active: this.state.ready && !this.state.destroy }), ref: 'container' },
					this.props.children
				)
			);
		}
	}]);

	return Modal;
})(_react2['default'].Component);

var Tips = (function (_React$Component2) {
	_inherits(Tips, _React$Component2);

	function Tips(props) {
		_classCallCheck(this, Tips);

		_get(Object.getPrototypeOf(Tips.prototype), 'constructor', this).call(this, props);
	}

	_createClass(Tips, [{
		key: 'render',
		value: function render() {
			var props = this.props;

			return _react2['default'].createElement(
				Modal,
				{ className: _styleModalStyl2['default'].tips, autoClose: props.duration || 2000 },
				props.msg
			);
		}
	}]);

	return Tips;
})(_react2['default'].Component);

var Dialog = (function (_React$Component3) {
	_inherits(Dialog, _React$Component3);

	function Dialog(props) {
		_classCallCheck(this, Dialog);

		_get(Object.getPrototypeOf(Dialog.prototype), 'constructor', this).call(this, props);
	}

	_createClass(Dialog, [{
		key: 'render',
		value: function render() {
			var props = this.props;

			var titleEl = false,
			    msgEl = false;

			if (props.title) {
				titleEl = _react2['default'].createElement(
					'header',
					null,
					props.title
				);
			}

			if (props.msg) {
				msgEl = _react2['default'].createElement(
					'section',
					null,
					props.msg
				);
			}

			return _react2['default'].createElement(
				Modal,
				_extends({ className: _styleModalStyl2['default'].dialog }, props),
				titleEl,
				msgEl,
				_react2['default'].createElement(
					'footer',
					null,
					_react2['default'].createElement(
						'button',
						{ 'data-action': 'close' },
						props.cancelTxt || '取消'
					),
					_react2['default'].createElement(
						'button',
						{ 'data-action': 'confirm' },
						props.confirmTxt || '确定'
					)
				)
			);
		}
	}]);

	return Dialog;
})(_react2['default'].Component);

exports['default'] = function (type, option) {

	type = type.toLowerCase();

	var el = document.createElement('div');

	document.body.appendChild(el);

	switch (type) {
		case 'tips':
			_react2['default'].render(_react2['default'].createElement(Tips, option), el);
			break;

		case 'dialog':
			_react2['default'].render(_react2['default'].createElement(Dialog, option), el);
			break;
	}
};

module.exports = exports['default'];