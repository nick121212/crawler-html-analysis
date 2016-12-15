import boom from "boom";
import _ from "lodash";
import deal from "./lib/deal";
import utils from "./lib/utils";
import jp from "json-pointer";
import fs from "fs";

export default (options) => {
    // 默认的解析html规则，读取body的innerText
    const defaultRule = {
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
    }

    const getRules = (config, queueItem) => {
        _.forEach(config.pages, (page) => {
            page.rule = _.map(page.rule, (rule) => {
                return new RegExp(utils.replaceRegexp(rule.regexp), rule.scope);
            });
        });

        return _.filter(config.pages, (page) => {
            return _.filter(page.rule, (rule) => {
                return rule.test(queueItem.url);
            }).length > 0;
        });
    }

    return async(ctx, next) => {
        let rules = getRules(ctx.config, ctx.queueItem);
        let urls = [];

        if (!rules.length) {
            ctx.status.htmlAnalysis = false;
        } else {
            ctx.queueItem.analysisResult = [];
            // 解析html页面成 文本，用于分词分析
            ctx.queueItem.responseBodyText = (await deal.doDeal(ctx.queueItem, defaultRule)).result.text;
            // 通过规则分析html文档
            for (let rule of rules) {
                rule.urls = _.map(rule.urls, (url) => {
                    return new RegExp(utils.replaceRegexp(url.regexp), url.scope);
                });
                ctx.queueItem.analysisResult.push(await deal.doDeal(ctx.queueItem, rule));
            };

            // 找出分析中的url数据
            for (let result of ctx.queueItem.analysisResult) {
                _.forEach(jp.dict(result.result), (res, key) => {
                    if (_.filter(result.rule.urls, (url) => {
                            return url.test(key);
                        }).length > 0) {
                        urls.push(res);
                    }
                });
            }
            ctx.queueItem.analysisResultUrls = urls || [];
            ctx.status.htmlAnalysis = true;
        }

        await next();
    };
}