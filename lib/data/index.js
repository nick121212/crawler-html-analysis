// let str = require("./str.js");
// let qs = require("./query_string.js");
// let num = require("./number.js");
// let regexp = require("./regexp.js");
// let match = require("./match.js");
// let repl = require("./replace.js");
// let json = require("./json.js");

import date from './date';
import json from './json';
import match from './match';
import num from './num';
import query_string from './query_string';
import regexp from './regexp';
import replace from './regexp';
import split from './split';
import str from './str';

class TypeStrategy {

    constructor() {
        this.formats = {
            data: date,
            json: json,
            match: match,
            query_string: query_string,
            num: num,
            regexp: regexp,
            replace: replace,
            split: split,
            str: str
        };
    }

    /**
     * 开始处理文本
     * @param result      {Any}    数据
     * @param config      {Object} 配置
     * @returns Any
     */
    doDeal(key, result, params) {
        let strategy = this.formats[key];

        if (!strategy) {
            return result;
        }

        try {
            return strategy.doDeal(result, params);
        } catch (e) {
            return result;
        }
    }
}

export default new TypeStrategy();