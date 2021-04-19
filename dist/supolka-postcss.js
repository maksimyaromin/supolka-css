'use strict';

const supolkaPluginFactory = () => {
    return {
        postcssPlugin: "supolka-css",
        plugins: []
    };
};
const SupolkaPlugin = supolkaPluginFactory;
SupolkaPlugin.postcss = true;

module.exports = SupolkaPlugin;
//# sourceMappingURL=supolka-postcss.js.map
