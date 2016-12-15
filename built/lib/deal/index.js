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

var _abase = require("./abase");

var _jsdom = require("../html/jsdom");

var _jsdom2 = _interopRequireDefault(_jsdom);

var _area = require("./area");

var _area2 = _interopRequireDefault(_area);

var _array = require("./array");

var _array2 = _interopRequireDefault(_array);

var _case = require("./case");

var _case2 = _interopRequireDefault(_case);

var _normal = require("./normal");

var _normal2 = _interopRequireDefault(_normal);

var _object = require("./object");

var _object2 = _interopRequireDefault(_object);

var _or = require("./or");

var _or2 = _interopRequireDefault(_or);

var _switch = require("./switch");

var _switch2 = _interopRequireDefault(_switch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 处理html文本策越
 */

var TypeStrategy = function (_Base) {
    (0, _inherits3.default)(TypeStrategy, _Base);

    /**
     * 构造函数
     * 注册默认的解析策略
     */
    function TypeStrategy() {
        (0, _classCallCheck3.default)(this, TypeStrategy);

        var _this = (0, _possibleConstructorReturn3.default)(this, (TypeStrategy.__proto__ || (0, _getPrototypeOf2.default)(TypeStrategy)).call(this));

        _this.deals = {
            area: _area2.default,
            array: _array2.default,
            case: _case2.default,
            normal: _normal2.default,
            object: _object2.default,
            or: _or2.default,
            switch: _switch2.default
        };
        return _this;
    }

    /**
     * 开始处理文本
     * @param queueItem      {Object}    数据
     * @param rule        {Object} 配置
     * @returns {Promise}
     */


    (0, _createClass3.default)(TypeStrategy, [{
        key: "doDeal",
        value: function doDeal(queueItem, rule) {
            var _this2 = this;

            var promiseAll = [];
            var dataResults = {};
            var check = function check(results) {
                var promises = [];
                var getPromises = function getPromises(results) {
                    _lodash2.default.forEach(results, function (result) {
                        if (_lodash2.default.isArray(result)) {
                            getPromises(result);
                        } else {
                            result && result.data && result.data.data && (promises = promises.concat(_this2.doDealData.call(_this2, queueItem, result.data.data, result.result, result.$cur, result.index)));
                        }
                    });
                };
                getPromises(results);

                return promises.length ? _promise2.default.all(promises).then(check) : {
                    result: dataResults,
                    rule: rule
                };
                // return promises.length ? Promise.all(promises).then(check) : dataResults;
            };

            // 处理area
            return this.deals.area.doDeal(queueItem, rule.areas).then(function (results) {
                _lodash2.default.forEach(rule.fields, function (field, key) {
                    promiseAll = promiseAll.concat(_this2.doDealData.call(_this2, queueItem, field.data, dataResults, results[key] ? results[key].$cur : null));
                });

                return _promise2.default.all(promiseAll).then(check);
            });
        }
    }]);
    return TypeStrategy;
}(_abase.Base);

exports.default = new TypeStrategy();