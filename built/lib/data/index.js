'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _json = require('./json');

var _json2 = _interopRequireDefault(_json);

var _match = require('./match');

var _match2 = _interopRequireDefault(_match);

var _num = require('./num');

var _num2 = _interopRequireDefault(_num);

var _query_string = require('./query_string');

var _query_string2 = _interopRequireDefault(_query_string);

var _regexp = require('./regexp');

var _regexp2 = _interopRequireDefault(_regexp);

var _split = require('./split');

var _split2 = _interopRequireDefault(_split);

var _str = require('./str');

var _str2 = _interopRequireDefault(_str);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TypeStrategy = function () {
    function TypeStrategy() {
        (0, _classCallCheck3.default)(this, TypeStrategy);

        this.formats = {
            data: _date2.default,
            json: _json2.default,
            match: _match2.default,
            query_string: _query_string2.default,
            num: _num2.default,
            regexp: _regexp2.default,
            replace: _regexp2.default,
            split: _split2.default,
            str: _str2.default
        };
    }

    /**
     * 开始处理文本
     * @param result      {Any}    数据
     * @param config      {Object} 配置
     * @returns Any
     */


    (0, _createClass3.default)(TypeStrategy, [{
        key: 'doDeal',
        value: function doDeal(key, result, params) {
            var strategy = this.formats[key];

            if (!strategy) {
                return result;
            }

            try {
                return strategy.doDeal(result, params);
            } catch (e) {
                return result;
            }
        }
    }]);
    return TypeStrategy;
}(); // let str = require("./str.js");
// let qs = require("./query_string.js");
// let num = require("./number.js");
// let regexp = require("./regexp.js");
// let match = require("./match.js");
// let repl = require("./replace.js");
// let json = require("./json.js");

exports.default = new TypeStrategy();