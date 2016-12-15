"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _abase = require("./abase");

var _jsdom = require("../html/jsdom");

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Strategy = function (_Base) {
    (0, _inherits3.default)(Strategy, _Base);

    /**
     * 构造函数
     * 注册默认的解析策略
     */
    function Strategy() {
        (0, _classCallCheck3.default)(this, Strategy);
        return (0, _possibleConstructorReturn3.default)(this, (Strategy.__proto__ || (0, _getPrototypeOf2.default)(Strategy)).call(this));
    }

    /**
     * 普通的情况下执行
     * @returns Promise
     */


    (0, _createClass3.default)(Strategy, [{
        key: "doDeal",
        value: function doDeal(queueItem, data, results, $, index) {
            var promise = _jsdom2.default.doDeal(queueItem, data, $, index).then(function (res) {
                if (!res.result || res.result.indexOf(res.data.match) < 0) {
                    res = null;
                } else {
                    res.result = results;
                    res.$cur = res.$parent;
                }

                return res;
            });

            return promise;
        }
    }]);
    return Strategy;
}(_abase.Base);

exports.default = new Strategy();