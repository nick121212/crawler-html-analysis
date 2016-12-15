"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Base = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _data = require("../data");

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Base = exports.Base = function () {
    function Base() {
        (0, _classCallCheck3.default)(this, Base);

        this.deals = {};
    }

    /**
     * 处理data数据
     * @param queueItem  {Object}
     * @param data       {Object}
     * @param curResults {Object}
     * @param $          {Object}
     * @param index      {Number}
     * @return {Array<Promise>}
     */


    (0, _createClass3.default)(Base, [{
        key: "doDealData",
        value: function doDealData(queueItem, data, curResults, $, index) {
            var _this = this;

            var promises = [];
            var strategy = null;

            data = data.concat([]);
            _lodash2.default.each(data, function (d) {
                strategy = _this.deals[d.dealStrategy] || _this.deals.normal;
                promises.push(strategy.doDeal.call(_this, queueItem, d, curResults, $, index));
            }, this);

            return promises;
        }

        /**
         * 数据的格式化函数
         * @param result  {String}
         * @param formats {Array<Object>}
         * @return {String|Number}
         */

    }, {
        key: "doFormatData",
        value: function doFormatData(result, formats) {
            var res = result;

            _lodash2.default.each(formats, function (format) {
                _lodash2.default.forEach(format, function (params, key) {
                    res = _data2.default.doDeal(key, res, params);
                });
            });

            return res;
        }
    }]);
    return Base;
}();