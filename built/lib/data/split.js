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
            var datas = result.split(data.splitOf || ' ');

            if (_lodash2.default.isNumber(data.start)) {
                result = _lodash2.default.slice(datas, data.start, _lodash2.default.isNumber(data.end) ? data.end : datas.length).join(data.join || "");
            }

            return result;
        }
    }]);
    return Strategy;
}();

exports.default = new Strategy();