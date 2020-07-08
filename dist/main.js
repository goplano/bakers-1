/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/form.js":
/*!*********************!*\
  !*** ./src/form.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SourdoughForm; });\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar SourdoughForm = /*#__PURE__*/function () {\n  // field lists\n  // buttons\n  // selectors\n  function SourdoughForm(sd) {\n    var _this = this;\n\n    _classCallCheck(this, SourdoughForm);\n\n    _defineProperty(this, \"allInputFields\", null);\n\n    _defineProperty(this, \"weightInputs\", null);\n\n    _defineProperty(this, \"percentInputs\", null);\n\n    _defineProperty(this, \"flourInputs\", null);\n\n    _defineProperty(this, \"totalHydrationInput\", null);\n\n    _defineProperty(this, \"totalFlourInput\", null);\n\n    _defineProperty(this, \"totalWaterInput\", null);\n\n    _defineProperty(this, \"totalWeightInput\", null);\n\n    _defineProperty(this, \"computationTypeDiv\", null);\n\n    _defineProperty(this, \"clearBtn\", null);\n\n    _defineProperty(this, \"sourdough\", null);\n\n    _defineProperty(this, \"selectors\", {\n      weights: 'input[data-type=weights]',\n      percents: 'input[data-type=percents]',\n      flours: \"input[name='flour[]']\",\n      mainFlour: '#mainflour',\n      addlFlour: '#addlflour',\n      salt: '#salt',\n      water: '#water',\n      starter: '#starter',\n      totalWater: '#totalWater',\n      totalFlour: '#totalFlour',\n      totalWeight: '#totalweight',\n      totalHydration: '#pTotalWater',\n      clearBtn: '#btnClear',\n      computationTypeDiv: '#computationType'\n    });\n\n    _defineProperty(this, \"doGramCalculations\", function () {\n      // update main, addl, water, salt and starter\n      _this.getWeightsFromForm(_this.sourdough); // update total weight\n\n\n      _this.totalWeightInput.value = _this.sourdough.totalWeight; // update total water\n\n      _this.totalWaterInput.value = _this.sourdough.totalWater; // update tot flour\n\n      _this.totalFlourInput.value = _this.sourdough.totalFlour; // update total hydration\n\n      _this.totalHydrationInput.value = parseFloat(_this.sourdough.totalHydration * 100).toFixed(0);\n      ;\n    });\n\n    this.sourdough = sd;\n    this.weightInputs = document.querySelectorAll(this.selectors.weights);\n    this.percentInputs = document.querySelectorAll(this.selectors.percents);\n    this.flourInputs = document.querySelectorAll(this.selectors.flours);\n    this.clearBtn = document.querySelector(this.selectors.clearBtn);\n    this.allInputFields = document.querySelectorAll('input');\n    this.totalFlourInput = document.querySelector(this.selectors.totalFlour);\n    this.totalWaterInput = document.querySelector(this.selectors.totalWater);\n    this.totalWeightInput = document.querySelector(this.selectors.totalWeight);\n    this.totalHydrationInput = document.querySelector(this.selectors.totalHydration);\n    this.computationTypeDiv = document.querySelector(this.selectors.computationTypeDiv);\n    this.getWeightsFromForm(sd);\n    this.setWeightsInput();\n  }\n\n  _createClass(SourdoughForm, [{\n    key: \"clearInputs\",\n    value: function clearInputs(nodeList) {\n      nodeList.forEach(function (elem) {\n        elem.value = null;\n      });\n    }\n  }, {\n    key: \"getSumOrValue\",\n    value: function getSumOrValue(myList) {\n      var sum = 0;\n\n      if (typeof myList == 'string') {\n        var node = document.querySelector(myList);\n        var val = node.value;\n        if (Number.isInteger(parseInt(val))) sum = parseInt(val);\n      } else {\n        var len = myList.length;\n\n        for (var i = len; i > 0; i--) {\n          var _val = myList[i - 1].value;\n          if (Number.isInteger(parseInt(_val))) sum += parseInt(_val);\n        }\n      }\n\n      return sum;\n    }\n  }, {\n    key: \"getWeightsFromForm\",\n    value: function getWeightsFromForm(sd) {\n      sd.mainFlour = this.getSumOrValue(this.selectors.mainFlour);\n      sd.addlFlour = this.getSumOrValue(this.selectors.addlFlour);\n      sd.water = this.getSumOrValue(this.selectors.water);\n      sd.salt = this.getSumOrValue(this.selectors.salt);\n      sd.starter = this.getSumOrValue(this.selectors.starter);\n    }\n  }, {\n    key: \"setWeightsInput\",\n    value: function setWeightsInput() {\n      var _this2 = this;\n\n      this.setReadOnly(this.totalWeightInput);\n      this.setReadOnly(this.totalWaterInput);\n      this.setReadOnly(this.totalFlourInput);\n      this.setReadOnly(this.totalHydrationInput);\n      this.setComputationTypeWeights();\n      this.percentInputs.forEach(function (elem) {\n        _this2.setReadOnly(elem); // TODO - remove event handler?\n\n      });\n      this.weightInputs.forEach(function (elem) {\n        _this2.setReadWrite(elem);\n\n        elem.onblur = _this2.doGramCalculations;\n      });\n    }\n  }, {\n    key: \"setPercentsInput\",\n    value: function setPercentsInput() {\n      var _this3 = this;\n\n      this.setComputationTypeGrams();\n      this.percentInputs.forEach(function (elem) {\n        _this3.setReadWrite(elem); // elem.onblur = doPercentCalculations\n\n      });\n      this.weightInputs.forEach(function (elem) {\n        _this3.setReadOnly(elem);\n      });\n    }\n  }, {\n    key: \"setComputationTypeWeights\",\n    value: function setComputationTypeWeights() {\n      this.computationTypeDiv.innerHTML = 'Calculating weights from percentages';\n    }\n  }, {\n    key: \"setComputationTypeGrams\",\n    value: function setComputationTypeGrams() {\n      this.computationTypeDiv.innerHTML = 'Calculating percentages from weight';\n    }\n  }, {\n    key: \"setReadOnly\",\n    value: function setReadOnly(elem) {\n      elem.setAttribute('readonly', 'readonly');\n      elem.setAttribute('tabindex', -1);\n    }\n  }, {\n    key: \"setReadWrite\",\n    value: function setReadWrite(elem) {\n      elem.removeAttribute('readonly');\n      elem.removeAttribute('tabindex');\n    }\n  }]);\n\n  return SourdoughForm;\n}();\n\n\n\n//# sourceURL=webpack:///./src/form.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _src_form__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/form */ \"./src/form.js\");\n/* harmony import */ var _sourdough__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sourdough */ \"./src/sourdough.js\");\n\n\n\nwindow.onload = function () {\n  var form = new _src_form__WEBPACK_IMPORTED_MODULE_0__[\"default\"](new _sourdough__WEBPACK_IMPORTED_MODULE_1__[\"default\"]());\n  form.clearBtn.addEventListener(\"click\", function (event) {\n    form.clearInputs(form.allInputFields);\n    event.preventDefault();\n  });\n};\n\nfunction updatePercentage(name, totalFlour) {\n  var decimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;\n  var name1 = \"#\".concat(name),\n      name2 = \"#p\".concat(name),\n      elem = document.querySelector(name1),\n      elem2 = document.querySelector(name2);\n\n  if (Number.isInteger(parseInt(elem.value))) {\n    elem2.value = parseFloat(parseInt(elem.value) / totalFlour * 100).toFixed(decimals);\n  }\n}\n\nfunction computePercentages(totalFlour) {\n  updatePercentage('mainflour', totalFlour);\n  updatePercentage('addlflour', totalFlour);\n  updatePercentage('water', totalFlour);\n  updatePercentage('salt', totalFlour);\n  updatePercentage('starter', totalFlour);\n}\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/sourdough.js":
/*!**************************!*\
  !*** ./src/sourdough.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Sourdough; });\n\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nvar Sourdough = /*#__PURE__*/function () {\n  function Sourdough() {\n    _classCallCheck(this, Sourdough);\n\n    _defineProperty(this, \"mainFlour\", 0);\n\n    _defineProperty(this, \"addlFlour\", 0);\n\n    _defineProperty(this, \"water\", 0);\n\n    _defineProperty(this, \"salt\", 0);\n\n    _defineProperty(this, \"starter\", 0);\n  }\n\n  _createClass(Sourdough, [{\n    key: \"levainPart\",\n    get: function get() {\n      return this.starter / 2;\n    }\n  }, {\n    key: \"totalFlour\",\n    get: function get() {\n      return this.levainPart + this.mainFlour + this.addlFlour;\n    }\n  }, {\n    key: \"totalWater\",\n    get: function get() {\n      return this.levainPart + this.water;\n    }\n  }, {\n    key: \"totalHydration\",\n    get: function get() {\n      if (this.totalFlour > 0) return this.totalWater / this.totalFlour;\n      return 0;\n    }\n  }, {\n    key: \"totalWeight\",\n    get: function get() {\n      return this.totalFlour + this.totalWater + this.salt;\n    }\n  }, {\n    key: \"percentMainFlour\",\n    get: function get() {\n      if (this.totalFlour > 0) return this.mainFlour / this.totalFlour;\n      return 0;\n    }\n  }, {\n    key: \"percentAddlFlour\",\n    get: function get() {\n      if (this.totalFlour > 0) return this.addlFlour / this.totalFlour;\n      return 0;\n    }\n  }, {\n    key: \"percentWater\",\n    get: function get() {\n      if (this.totalFlour > 0) return this.water / this.totalFlour;\n      return 0;\n    }\n  }, {\n    key: \"percentSalt\",\n    get: function get() {\n      if (this.totalFlour > 0) return this.salt / this.totalFlour;\n      return 0;\n    }\n  }, {\n    key: \"percentStarter\",\n    get: function get() {\n      if (this.totalFlour > 0) return this.starter / this.totalFlour;\n      return 0;\n    }\n  }]);\n\n  return Sourdough;\n}();\n\n\n\n//# sourceURL=webpack:///./src/sourdough.js?");

/***/ })

/******/ });