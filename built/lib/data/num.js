"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isNan = require("babel-runtime/core-js/number/is-nan");

var _isNan2 = _interopRequireDefault(_isNan);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 处理html文本策越
 */
var Strategy = function () {
    function Strategy() {
        (0, _classCallCheck3.default)(this, Strategy);
    }

    (0, _createClass3.default)(Strategy, [{
        key: "doDeal",

        /**
         * 转换成数字类型
         * @param reseult {Any}
         * @returns {String}
         */
        value: function doDeal(result) {
            var res = Number(result);

            if ((0, _isNan2.default)(res)) {
                res = 0;
            }

            return res;
        }
    }]);
    return Strategy;
}();

exports.default = new Strategy();