"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * string值处理
 */
var Strategy = function () {
    function Strategy() {
        (0, _classCallCheck3.default)(this, Strategy);
    }

    (0, _createClass3.default)(Strategy, [{
        key: "doDeal",

        /**
         * 开始处理文本,去掉左右空格,去掉中间空格,去掉制表符
         * @param result      {String} dom节点的值
         * @returns {String}
         */
        value: function doDeal(result) {
            if (typeof result !== "string") {
                return result;
            }

            result = result || "";
            result = result.replace(/\r\n/gi, '');
            // result = result.replace(/\t/gi, '');
            // result = result.replace(/\s+/g, '');
            result = _lodash2.default.trim(result);

            return result;
        }
    }]);
    return Strategy;
}();

exports.default = new Strategy();