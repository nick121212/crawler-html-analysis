"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsdom = require("jsdom");
var _ = require("lodash");
var fs = require("fs");
var jquery = fs.readFileSync(__dirname + "/../../jquery.js", "utf-8");

var CheerDealStrategy = function () {
    function CheerDealStrategy() {
        (0, _classCallCheck3.default)(this, CheerDealStrategy);
    }

    (0, _createClass3.default)(CheerDealStrategy, [{
        key: "load",

        /**
         * @param queueItem {Object} 数据
         */
        value: function load(queueItem, $) {
            return new _promise2.default(function (resolve, reject) {
                !$ && jsdom.env({
                    html: queueItem.responseBody.replace(/iframe/g, "iframe1"),
                    parsingMode: "html",
                    src: [jquery],
                    done: function done(err, window) {
                        if (err) {
                            return reject(err);
                        }
                        resolve(window.$("body"));
                    }
                });
                if ($) {
                    resolve($);
                }
            });
        }

        /**
         * @param queueItem {Object} 数据
         * @param data      {Object} 单个数据配置
         * @param $         {Cheerio} Dom节点
         * @param index     {number}  数组中，节点的索引
         * @return promise
         */

    }, {
        key: "doDeal",
        value: function doDeal(queueItem, data, $, index) {
            var _this = this;

            var $sel = void 0,
                result = void 0,
                len = 0;
            var $noSelcSel = void 0;

            return new _promise2.default(function () {
                var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(resolve, reject) {
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    _context.next = 2;
                                    return _this.load(queueItem, $);

                                case 2:
                                    $ = _context.sent;


                                    // 如果存在index，则获取索引节点
                                    if (typeof index === "number" && $.size() > index) {
                                        $sel = $.eq(index);
                                    }
                                    try {
                                        $noSelcSel = $sel || $;
                                        // 查找当前的dom
                                        $sel = _this.doFindSelector($noSelcSel, data.selector);
                                        $sel && (len = $sel.length);

                                        if (len && data.methodInfo) {
                                            $sel = _this.doRemoveEle($sel, data.removeSelector);
                                            result = _this.doCallMethod($sel, data.methodInfo);
                                        }

                                        resolve({
                                            result: result,
                                            data: _.cloneDeep(data),
                                            $cur: $sel,
                                            $noSelcSel: $noSelcSel,
                                            $parent: $,
                                            len: len,
                                            index: index
                                        });
                                    } catch (e) {
                                        reject(e);
                                    }

                                case 5:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, _this);
                }));

                return function (_x, _x2) {
                    return _ref.apply(this, arguments);
                };
            }());
        }
    }, {
        key: "doRemoveEle",
        value: function doRemoveEle($sel, selector) {
            if (!_.isArray(selector)) {
                selector = [selector];
            }
            _.each(selector, function (sel) {
                try {
                    $sel.find(sel).remove();
                } catch (e) {}
            });

            return $sel;
        }

        /**
         * 取得元素节点
         * @param $ {Object} cheerio对象
         * @param selector {Array|String} 搜索字段
         * @return cheerio对象
         */

    }, {
        key: "doFindSelector",
        value: function doFindSelector($, selector) {
            var _this2 = this;

            var $sel = $;

            if (!selector) {
                selector = [];
            }
            if (!_.isArray(selector)) {
                typeof selector === "string" && (selector = [selector]);
            }

            if (!_.isArray(selector)) {
                return $sel;
            }

            _.each(selector, function (sel) {
                switch (typeof sel === "undefined" ? "undefined" : (0, _typeof3.default)(sel)) {
                    case "string":
                        $sel = $sel.find(sel);
                        break;
                    case "object":
                        $sel = _this2.doCallMethod($sel, sel);
                        break;
                }
                if (!$sel.length) {
                    return false;
                }
            });

            return $sel;
        }

        /**
         * 调用方法
         * @param $   {Object} cheerio对象
         * @param methodInfo {Object} 调用的方法名称
         * @returns {*}
         */

    }, {
        key: "doCallMethod",
        value: function doCallMethod($, methodInfo) {
            var $sel = null;

            _.forEach(methodInfo, function (params, method) {
                if (params && !_.isArray(params)) {
                    params = [params];
                }
                $sel = $[method].apply($, params || []);
            });

            return $sel;
        }
    }]);
    return CheerDealStrategy;
}();

exports.default = new CheerDealStrategy();