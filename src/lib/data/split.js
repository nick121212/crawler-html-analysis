import _ from "lodash";

class Strategy {
    /**
     * 正则匹配数据
     * @returns {String}
     */
    doDeal(result, data) {
        let datas = result.split(data.splitOf || ' ');

        if (_.isNumber(data.start)) {
            result = _.slice(datas, data.start, _.isNumber(data.end) ? data.end : datas.length).join(data.join || "");
        }

        return result;
    }
}

export default new Strategy();