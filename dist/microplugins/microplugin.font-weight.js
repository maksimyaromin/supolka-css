'use strict';

var microplugin_fontSize = require('./microplugin.font-size.js');

const creator = ({ theme }) => {
    const options = theme("fontWeight");
    return microplugin_fontSize.createAtomicMicroplugin(options, "fontWeight", "fw");
};

exports.creator = creator;
//# sourceMappingURL=microplugin.font-weight.js.map
