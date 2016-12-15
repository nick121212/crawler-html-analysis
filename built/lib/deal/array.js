"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _jsonPathProcessor = require("json-path-processor");

var _jsonPathProcessor2 = _interopRequireDefault(_jsonPathProcessor);

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
     * 数组的情况下执行
     * @param queueItem {Object}  链接信息
     * @param data      {Object}  配置数据
     * @param results   {Object}  结果数据
     * @param $         {Object}  父jquery对象
     * @param index     {Number}  jquery索引
     * @returns Promise
     */


    (0, _createClass3.default)(Strategy, [{
        key: "doDeal",
        value: function doDeal(queueItem, data, results, $, index) {
            var _this2 = this;

            // let defer = Promise.defer();
            var jData = (0, _jsonPathProcessor2.default)(results);
            var path = "";
            var idx = _lodash2.default.isUndefined(data.dataIndex) ? index : data.dataIndex;
            var resource = void 0;

            if (typeof idx === "number" && _lodash2.default.isArray(results)) {
                path = "" + idx;
            }
            if (data.key) {
                path.length && (path += ".");
                path += "" + data.key;
            }
            jData.set(path, [], true);
            results = jData.get(path).value();
            // data.key && (results[data.key] = []);
            return _jsdom2.default.doDeal(queueItem, data, $, index).then(function (res) {
                var promises = [];

                res.result = results;
                for (var i = 0, n = res.len; i < n; i++) {
                    res.result.push({});
                    promises = promises.concat(_this2.doDealData(queueItem, data.data.concat([]), res.result, res.$cur, i));
                }
                resource = res;

                return promises;
            }).then(function (promises) {
                if (promises.length) {
                    return _promise2.default.all(promises).then(function (cases) {
                        var rtnResults = [];
                        _lodash2.default.each(cases, function (casee) {
                            if (casee) {
                                rtnResults.push(casee);
                            }
                        });
                        return rtnResults;
                    });
                }

                return resource;
            });
        }
    }]);
    return Strategy;
}(_abase.Base);

exports.default = new Strategy();