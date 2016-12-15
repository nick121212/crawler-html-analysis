"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = require("../utils");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Strategy = function () {
    function Strategy() {
        (0, _classCallCheck3.default)(this, Strategy);
    }

    (0, _createClass3.default)(Strategy, [{
        key: "doDeal",

        /**
         * 正则匹配数据
         * @returns {String}
         */
        value: function doDeal(result, data) {
            var regexp = new RegExp(_utils2.default.replaceRegexp(data.regexp), data.scope || "i");

            return result.replace(regexp, data.repStr || "");
        }
    }]);
    return Strategy;
}();

exports.default = new Strategy();