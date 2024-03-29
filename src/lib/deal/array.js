import _ from "lodash";
import jpp from "json-path-processor";
import { Base } from "./abase";
import jsdom from "../html/jsdom";

class Strategy extends Base {
    /**
     * 构造函数
     * 注册默认的解析策略
     */
    constructor() {
        super();
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
    doDeal(queueItem, data, results, $, index) {
        // let defer = Promise.defer();
        let jData = jpp(results);
        let path = "";
        let idx = _.isUndefined(data.dataIndex) ? index : data.dataIndex;
        let resource;

        if (typeof idx === "number" && _.isArray(results)) {
            path = `${idx}`;
        }
        if (data.key) {
            path.length && (path += ".");
            path += `${data.key}`;
        }
        jData.set(path, [], true);
        results = jData.get(path).value();
        // data.key && (results[data.key] = []);
        return jsdom.doDeal(queueItem, data, $, index).then((res) => {
            let promises = [];

            res.result = results;
            for (let i = 0, n = res.len; i < n; i++) {
                res.result.push({});
                promises = promises.concat(this.doDealData(queueItem, data.data.concat([]), res.result, res.$cur, i));
            }
            resource = res;

            return promises;
        }).then((promises) => {
            if (promises.length) {
                return Promise.all(promises).then((cases) => {
                    let rtnResults = [];
                    _.each(cases, (casee) => {
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
}

export default new Strategy();