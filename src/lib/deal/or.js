import _ from "lodash";
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
     * 数组类型,直接返回空数组
     * @returns Promise
     */
    doDeal(queueItem, data, results, $, index) {
        let promises = this.doDealData(queueItem, data.data.concat([]), results, $, index);

        return Promise.all(promises).then((cases) => {
            let rtnResults = [];

            _.each(cases, (casee) => {
                if (casee.result) {
                    rtnResults.push(casee);
                    return false;
                }
            });
        });
    }
}

export default new Strategy();