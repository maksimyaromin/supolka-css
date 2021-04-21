import { SupolkaPluginFactory, SupolkaPlugin } from "./types/index";
import defaultOptions from "./default-options";
import { getProcessor } from "./core";
import { resolveOptions } from "./utils/options";

const supolkaPluginFactory: SupolkaPluginFactory = (options) => {
    const getOptions = () => ({
        ...defaultOptions,
        ...options
    });
    const resolvedOptions = resolveOptions(getOptions);

    return {
        postcssPlugin: "supolka-css",
        plugins: [getProcessor(resolvedOptions)]
    };
};

const SupolkaPlugin = supolkaPluginFactory as SupolkaPlugin;
SupolkaPlugin.postcss = true;

export default SupolkaPlugin;
