"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var moment = require("moment");
var _ = require("lodash");

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
         * 转换成日期类型
         * @param reseult {Any}
         * @returns {String}
         */
        value: function doDeal(result, settings) {
            var res = moment(_.trim(result), settings.format || 'YYYY-MM-DD');

            if (res.isValid()) {
                return res.format(settings.format || "YYYY-MM-DD");
            }

            return "1990-01-01";
        }
    }]);
    return Strategy;
}();

exports.default = new Strategy();