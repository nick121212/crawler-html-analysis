"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _qs = require("qs");

var _qs2 = _interopRequireDefault(_qs);

var _jsonPathProcessor = require("json-path-processor");

var _jsonPathProcessor2 = _interopRequireDefault(_jsonPathProcessor);

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
         * 处理数据，获取querystring中键值
         * @returns {String}
         */
        value: function doDeal(result, data) {
            if (!result) {
                return null;
            }
            var noSparse = void 0,
                jData = void 0;

            if (typeof result === "string") {
                if (result.indexOf("?") >= 0) {
                    result = result.substr(result.indexOf("?") + 1);
                }
                if (result.indexOf("#") >= 0) {
                    result = result.substr(result.indexOf("#") + 1);
                }
            }

            noSparse = _qs2.default.parse(result);
            jData = (0, _jsonPathProcessor2.default)(noSparse);

            return jData.get.apply(jData, data.dataLaraParams || []).value();
        }
    }]);
    return Strategy;
}();

exports.default = new Strategy();