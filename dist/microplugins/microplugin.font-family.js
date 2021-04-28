'use strict';

var microplugin_fontSize = require('./microplugin.font-size.js');
var lodash = require('lodash');

const creator = ({ theme }) => {
    const options = lodash.omit(theme("fontFamily"), "sans", "mono");
    return microplugin_fontSize.createAtomicMicroplugin(options, "fontFamily", "font");
};

exports.creator = creator;
//# sourceMappingURL=microplugin.font-family.js.map
