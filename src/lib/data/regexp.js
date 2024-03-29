import tools from "../utils";

/**
 * 处理html文本策越
 */
class Strategy {
    /**
     * 正则匹配数据
     * @returns {String}
     */
    doDeal(result, data) {
        let regexp = new RegExp(tools.replaceRegexp(data.regexp), data.scope || "i");
        let matchs = result.match(regexp);
        let index = data.index || 0;

        if (matchs.length > index) {
            result = matchs[index];
        } else {
            result = "";
        }

        return result;
    }
}

export default new Strategy();