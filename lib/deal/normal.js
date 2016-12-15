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
     * 普通的情况下执行
     * @returns Promise
     */
    doDeal(queueItem, data, results, $, index) {
        let promise = jsdom.doDeal(queueItem, data, $, index).then((res) => {
            let jData = jpp(results);
            let path = "";
            let idx = _.isUndefined(res.data.dataIndex) ? res.index : res.data.dataIndex;

            if (typeof idx === "number" && _.isArray(results)) {
                path = `${idx}`;
            }
            if (data.key) {
                path.length && (path += ".");
                path += `${data.key}`;
            }
            res.result && jData.set(path, this.doFormatData(res.result, data.formats), true);

            return res;
        });

        return promise;
    }
}

export default new Strategy();