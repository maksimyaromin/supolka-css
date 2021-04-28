'use strict';

var lodash = require('lodash');
var microplugin_fontSize = require('./microplugin.font-size.js');

const creator = ({ theme }) => {
    const root = "padding";
    const options = theme(root);
    const transformValue = microplugin_fontSize.transformThemeOption(root);
    const css = lodash.reduce(options, (output, value, key) => {
        return lodash.assign(output, {
            [microplugin_fontSize.useClassName("p", key)]: {
                "padding": transformValue(value)
            },
            [microplugin_fontSize.useClassName("px", key)]: {
                "padding-left": transformValue(value),
                "padding-right": transformValue(value)
            },
            [microplugin_fontSize.useClassName("py", key)]: {
                "padding-bottom": transformValue(value),
                "padding-top": transformValue(value)
            },
            [microplugin_fontSize.useClassName("pt", key)]: {
                "padding-top": transformValue(value)
            },
            [microplugin_fontSize.useClassName("pr", key)]: {
                "padding-right": transformValue(value)
            },
            [microplugin_fontSize.useClassName("pb", key)]: {
                "padding-bottom": transformValue(value)
            },
            [microplugin_fontSize.useClassName("pl", key)]: {
                "padding-left": transformValue(value)
            }
        });
    }, {});
    return microplugin_fontSize.parseCss(css);
};

exports.creator = creator;
//# sourceMappingURL=microplugin.padding.js.map
