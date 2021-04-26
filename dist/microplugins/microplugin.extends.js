'use strict';

var lodash = require('lodash');
var microplugin_fontSize = require('./microplugin.font-size.js');

const creator = ({ theme, key }) => {
    const extendsCss = theme(`extends.${key}`);
    if (!lodash.isPlainObject(extendsCss)) {
        return Promise.resolve([]);
    }
    return microplugin_fontSize.parseCss(extendsCss);
};

exports.creator = creator;
//# sourceMappingURL=microplugin.extends.js.map
