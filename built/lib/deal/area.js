"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _jsdom = require("../html/jsdom");

var _jsdom2 = _interopRequireDefault(_jsdom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Strategy = function () {
    function Strategy() {
        (0, _classCallCheck3.default)(this, Strategy);
    }

    (0, _createClass3.default)(Strategy, [{
        key: "doDeal",

        /**
         * 数组类型,直接返回空数组
         * @param queueItem {Object}
         * @param areas {Object}
         * @returns Promise
         */
        value: function doDeal(queueItem, areas) {
            var promises = [];

            // 遍历
            _lodash2.default.each(areas, function (area, key) {
                promises.push(_jsdom2.default.doDeal(queueItem, area));
            });

            // 执行
            return _promise2.default.all(promises).then(function (results) {
                return _lodash2.default.keyBy(results, function (res) {
                    if (res && res.data) {
                        return res.data.key;
                    }
                    return Date.now();
                });
            });
        }
    }]);
    return Strategy;
}();

exports.default = new Strategy();