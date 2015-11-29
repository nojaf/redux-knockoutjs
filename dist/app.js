webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _mainViewModel = __webpack_require__(1);

	var _knockout = __webpack_require__(2);

	var _knockout2 = _interopRequireDefault(_knockout);

	var _colorCanvas = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	(function () {
	    window.onload = function () {
	        _knockout2.default.components.register(_colorCanvas.componentName, _colorCanvas.component);
	        var node = document.getElementById("app");
	        _knockout2.default.applyBindings(_mainViewModel.mainViewModel, node);
	    };
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.mainViewModel = undefined;

	var _knockout = __webpack_require__(2);

	var _knockout2 = _interopRequireDefault(_knockout);

	var _index = __webpack_require__(5);

	var _index2 = _interopRequireDefault(_index);

	var _index3 = __webpack_require__(19);

	var _index4 = _interopRequireDefault(_index3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MainViewModel = (function () {
	    function MainViewModel() {
	        var _this = this;

	        _classCallCheck(this, MainViewModel);

	        this.applicationState = _knockout2.default.observable(this.getState());
	        this.unsubscribe = _index2.default.subscribe(function () {
	            console.info("store changed");
	            _this.applicationState(_this.getState());
	        });
	        this.color = _knockout2.default.pureComputed(function () {
	            return _this.applicationState().color;
	        });
	        this.height = _knockout2.default.pureComputed(function () {
	            return _this.applicationState().height + "px";
	        });
	        this.width = _knockout2.default.pureComputed(function () {
	            return _this.applicationState().width + "px";
	        });
	        this.statePrint = _knockout2.default.pureComputed(function () {
	            return _knockout2.default.toJSON(_this.applicationState());
	        });
	        this.errors = _knockout2.default.pureComputed(function () {
	            return _this.applicationState().errors;
	        });
	        this.hasErrors = _knockout2.default.pureComputed(function () {
	            return _this.errors() && _this.errors().length > 0;
	        });
	    }

	    _createClass(MainViewModel, [{
	        key: "updateWidth",
	        value: function updateWidth(data, e) {
	            this.updateDimension(e, _index4.default.changeWidth);
	        }
	    }, {
	        key: "updateHeight",
	        value: function updateHeight(data, e) {
	            this.updateDimension(e, _index4.default.changeHeight);
	        }
	    }, {
	        key: "updateDimension",
	        value: function updateDimension(e, actionCreator) {
	            var value = this.getValueAsInt(e.target);
	            if (value) {
	                this.dispatch(actionCreator(value));
	            }
	        }
	    }, {
	        key: "getValueAsInt",
	        value: function getValueAsInt(input) {
	            return input.value;
	        }
	    }, {
	        key: "updateColor",
	        value: function updateColor(data, e) {
	            this.dispatch(_index4.default.changeColor(e.target.value));
	        }
	    }, {
	        key: "getState",
	        value: function getState() {
	            return _index2.default.getState() || { color: "", width: "", height: "", erros: [] };
	        }
	    }, {
	        key: "dispatch",
	        value: function dispatch(action) {
	            return _index2.default.dispatch(action);
	        }
	    }]);

	    return MainViewModel;
	})();

	var mainViewModel = exports.mainViewModel = new MainViewModel();

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(6);

	var _index = __webpack_require__(16);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _redux.createStore)(_index2.default);
	exports.default = store;

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = rootReducer;

	var _index = __webpack_require__(17);

	var _objectAssign2 = __webpack_require__(18);

	var _objectAssign3 = _interopRequireDefault(_objectAssign2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var widthError = "Width should be numeric";
	var heightError = "Height should be numeric";
	var reducerMap = new Map();
	function changeWidth(initialState, width) {
	    if (isValidNumeric(width)) {
	        return updatedErrorState(initialState, widthError, "width");
	    }
	    var errors = removeError(initialState.errors, widthError);
	    return (0, _objectAssign3.default)({}, initialState, { width: width, errors: errors });
	}
	function changeHeight(initialState, height) {
	    if (isValidNumeric(height)) {
	        return updatedErrorState(initialState, heightError, "height");
	    }
	    var errors = removeError(initialState.errors, heightError);
	    return (0, _objectAssign3.default)({}, initialState, { height: height, errors: errors });
	}
	function isValidNumeric(input) {
	    return !input || isNaN(input);
	}
	function updatedErrorState(initialState, error, resetValue) {
	    var errors = initialState.errors ? addError(initialState.errors, error) : [error];
	    return (0, _objectAssign3.default)({}, initialState, _defineProperty({ errors: errors }, resetValue, 0));
	}
	function addError(errors, newError) {
	    if (errors.indexOf(newError) !== -1) return errors;
	    return [].concat(errors, [newError]);
	}
	function removeError(errors, errorToRemove) {
	    if (!errors) return [];
	    var index = errors.indexOf(errorToRemove);
	    if (index === -1) return errors;
	    return [].concat(errors.slice(0, index), errors.slice(index + 1));
	}
	function changeColor(initialState, color) {
	    return (0, _objectAssign3.default)({}, initialState, { "color": color });
	}
	reducerMap.set(_index.ActionTypes.CHANGE_WIDTH, changeWidth);
	reducerMap.set(_index.ActionTypes.CHANGE_HEIGHT, changeHeight);
	reducerMap.set(_index.ActionTypes.CHANGE_COLOR, changeColor);
	function rootReducer() {
	    var initialState = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var action = arguments[1];

	    return reducerMap.has(action.type) ? reducerMap.get(action.type)(initialState, action.payload) : initialState;
	}

/***/ },
/* 17 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var ActionTypes = exports.ActionTypes = undefined;
	(function (ActionTypes) {
	    ActionTypes[ActionTypes["CHANGE_COLOR"] = 0] = "CHANGE_COLOR";
	    ActionTypes[ActionTypes["CHANGE_WIDTH"] = 1] = "CHANGE_WIDTH";
	    ActionTypes[ActionTypes["CHANGE_HEIGHT"] = 2] = "CHANGE_HEIGHT";
	})(ActionTypes || (exports.ActionTypes = ActionTypes = {}));

/***/ },
/* 18 */,
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(17);

	function changeWidth(width) {
	    return {
	        type: _index.ActionTypes.CHANGE_WIDTH,
	        payload: width
	    };
	}
	function changeHeight(height) {
	    return {
	        type: _index.ActionTypes.CHANGE_HEIGHT,
	        payload: height
	    };
	}
	function changeColor(color) {
	    return {
	        type: _index.ActionTypes.CHANGE_COLOR,
	        payload: color
	    };
	}
	exports.default = {
	    changeWidth: changeWidth,
	    changeHeight: changeHeight,
	    changeColor: changeColor
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.component = exports.componentName = undefined;

	var _knockout = __webpack_require__(2);

	var _knockout2 = _interopRequireDefault(_knockout);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var componentName = exports.componentName = "color-canvas";
	var component = exports.component = {
	    viewModel: function viewModel(params) {
	        this.style = _knockout2.default.pureComputed(function () {
	            return {
	                "display": "block",
	                "backgroundColor": params.color(),
	                "width": params.width(),
	                "height": params.height()
	            };
	        });
	    },
	    template: "\n\t\t<div data-bind=\"style: style\"></div>\n\t"
	};

/***/ }
]);