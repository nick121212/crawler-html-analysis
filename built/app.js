"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _boom = require("boom");

var _boom2 = _interopRequireDefault(_boom);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _deal = require("./lib/deal");

var _deal2 = _interopRequireDefault(_deal);

var _utils = require("./lib/utils");

var _utils2 = _interopRequireDefault(_utils);

var _jsonPointer = require("json-pointer");

var _jsonPointer2 = _interopRequireDefault(_jsonPointer);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (options) {
    // 默认的解析html规则，读取body的innerText
    var defaultRule = {
        "areas": [],
        "fields": {
            "none": {
                "data": [{
                    "key": "text",
                    "selector": [],
                    "removeSelector": ["script"],
                    "methodInfo": { "text": [] },
                    "formats": [{ "str": [] }],
                    "htmlStrategy": "jsdom",
                    "dealStrategy": "normal"
                }]
            }
        }
    };

    var getRules = function getRules(config, queueItem) {
        _lodash2.default.forEach(config.pages, function (page) {
            page.rule = _lodash2.default.map(page.rule, function (rule) {
                return new RegExp(_utils2.default.replaceRegexp(rule.regexp), rule.scope);
            });
        });

        return _lodash2.default.filter(config.pages, function (page) {
            return _lodash2.default.filter(page.rule, function (rule) {
                return rule.test(queueItem.url);
            }).length > 0;
        });
    };

    return function () {
        var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(ctx, next) {
            var rules, urls, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, rule, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _loop, _iterator2, _step2;

            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            rules = getRules(ctx.config, ctx.queueItem);
                            urls = [];

                            if (rules.length) {
                                _context.next = 6;
                                break;
                            }

                            ctx.status.htmlAnalysis = false;
                            _context.next = 63;
                            break;

                        case 6:
                            ctx.queueItem.analysisResult = [];
                            // 解析html页面成 文本，用于分词分析
                            _context.next = 9;
                            return _deal2.default.doDeal(ctx.queueItem, defaultRule);

                        case 9:
                            ctx.queueItem.responseBodyText = _context.sent.result.text;

                            // 通过规则分析html文档
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 13;
                            _iterator = (0, _getIterator3.default)(rules);

                        case 15:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                _context.next = 26;
                                break;
                            }

                            rule = _step.value;

                            rule.urls = _lodash2.default.map(rule.urls, function (url) {
                                return new RegExp(_utils2.default.replaceRegexp(url.regexp), url.scope);
                            });
                            _context.t0 = ctx.queueItem.analysisResult;
                            _context.next = 21;
                            return _deal2.default.doDeal(ctx.queueItem, rule);

                        case 21:
                            _context.t1 = _context.sent;

                            _context.t0.push.call(_context.t0, _context.t1);

                        case 23:
                            _iteratorNormalCompletion = true;
                            _context.next = 15;
                            break;

                        case 26:
                            _context.next = 32;
                            break;

                        case 28:
                            _context.prev = 28;
                            _context.t2 = _context["catch"](13);
                            _didIteratorError = true;
                            _iteratorError = _context.t2;

                        case 32:
                            _context.prev = 32;
                            _context.prev = 33;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }

                        case 35:
                            _context.prev = 35;

                            if (!_didIteratorError) {
                                _context.next = 38;
                                break;
                            }

                            throw _iteratorError;

                        case 38:
                            return _context.finish(35);

                        case 39:
                            return _context.finish(32);

                        case 40:
                            ;

                            // 找出分析中的url数据
                            _iteratorNormalCompletion2 = true;
                            _didIteratorError2 = false;
                            _iteratorError2 = undefined;
                            _context.prev = 44;

                            _loop = function _loop() {
                                var result = _step2.value;

                                _lodash2.default.forEach(_jsonPointer2.default.dict(result.result), function (res, key) {
                                    if (_lodash2.default.filter(result.rule.urls, function (url) {
                                        return url.test(key);
                                    }).length > 0) {
                                        urls.push(res);
                                    }
                                });
                            };

                            for (_iterator2 = (0, _getIterator3.default)(ctx.queueItem.analysisResult); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                _loop();
                            }
                            _context.next = 53;
                            break;

                        case 49:
                            _context.prev = 49;
                            _context.t3 = _context["catch"](44);
                            _didIteratorError2 = true;
                            _iteratorError2 = _context.t3;

                        case 53:
                            _context.prev = 53;
                            _context.prev = 54;

                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                _iterator2.return();
                            }

                        case 56:
                            _context.prev = 56;

                            if (!_didIteratorError2) {
                                _context.next = 59;
                                break;
                            }

                            throw _iteratorError2;

                        case 59:
                            return _context.finish(56);

                        case 60:
                            return _context.finish(53);

                        case 61:
                            ctx.queueItem.analysisResultUrls = urls || [];
                            ctx.status.htmlAnalysis = true;

                        case 63:
                            _context.next = 65;
                            return next();

                        case 65:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[13, 28, 32, 40], [33,, 35, 39], [44, 49, 53, 61], [54,, 56, 60]]);
        }));

        return function (_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }();
};