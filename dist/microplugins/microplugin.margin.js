'use strict';

var lodash = require('lodash');
var microplugin_fontSize = require('./microplugin.font-size.js');

const creator = ({ theme }) => {
    const root = "margin";
    const options = theme(root);
    const transformValue = microplugin_fontSize.transformThemeOption(root);
    const css = lodash.reduce(options, (output, value, key) => {
        return lodash.assign(output, {
            [microplugin_fontSize.useClassName("m", key)]: {
                "margin": transformValue(value)
            },
            [microplugin_fontSize.useClassName("mx", key)]: {
                "margin-left": transformValue(value),
                "margin-right": transformValue(value)
            },
            [microplugin_fontSize.useClassName("my", key)]: {
                "margin-bottom": transformValue(value),
                "margin-top": transformValue(value)
            },
            [microplugin_fontSize.useClassName("mt", key)]: {
                "margin-top": transformValue(value)
            },
            [microplugin_fontSize.useClassName("mr", key)]: {
                "margin-right": transformValue(value)
            },
            [microplugin_fontSize.useClassName("mb", key)]: {
                "margin-bottom": transformValue(value)
            },
            [microplugin_fontSize.useClassName("ml", key)]: {
                "margin-left": transformValue(value)
            }
        });
    }, {});
    return microplugin_fontSize.parseCss(css);
};

exports.creator = creator;
//# sourceMappingURL=microplugin.margin.js.map
