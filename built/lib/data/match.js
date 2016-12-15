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
        value: function doDeal(result, settings) {
            var regex = new RegExp(_utils2.default.replaceRegexp(settings.regexp), settings.scope || "ig");
            var matchs = result.match(regex);
            var res = result;

            settings.index = settings.index || 0;
            if (matchs.length > settings.index || 0) {
                res = matchs[settings.index];
            }

            return res;
        }
    }]);
    return Strategy;
}();

exports.default = new Strategy();