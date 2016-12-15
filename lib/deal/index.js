import _ from "lodash";
import { Base } from "./abase";
import jsdom from "../html/jsdom";

import area from "./area";
import array from "./array";
import casee from "./case";
import normal from "./normal";
import objecte from "./object";
import ore from "./or";
import switche from "./switch";

/**
 * 处理html文本策越
 */

class TypeStrategy extends Base {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor() {
        super();
        this.deals = {
            area: area,
            array: array,
            case: casee,
            normal: normal,
            object: objecte,
            or: ore,
            switch: switche
        };
    }

    /**
     * 开始处理文本
     * @param queueItem      {Object}    数据
     * @param rule        {Object} 配置
     * @returns {Promise}
     */
    doDeal(queueItem, rule) {
        let promiseAll = [];
        let dataResults = {};
        let check = (results) => {
            let promises = [];
            let getPromises = (results) => {
                _.forEach(results, (result) => {
                    if (_.isArray(result)) {
                        getPromises(result);
                    } else {
                        result && result.data && result.data.data && (promises = promises.concat(this.doDealData.call(this, queueItem, result.data.data, result.result, result.$cur, result.index)));
                    }
                });
            };
            getPromises(results);

            return promises.length ? Promise.all(promises).then(check) : {
                result: dataResults,
                rule: rule
            };
            // return promises.length ? Promise.all(promises).then(check) : dataResults;
        };

        // 处理area
        return this.deals.area.doDeal(queueItem, rule.areas).then((results) => {
            _.forEach(rule.fields, (field, key) => {
                promiseAll = promiseAll.concat(this.doDealData.call(this, queueItem, field.data, dataResults, results[key] ? results[key].$cur : null));
            });

            return Promise.all(promiseAll).then(check);
        });
    }
}

export default new TypeStrategy();