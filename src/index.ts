import { SupolkaPluginFactory, SupolkaPlugin } from "./types/index";

const supolkaPluginFactory: SupolkaPluginFactory = () => {

    return {
        postcssPlugin: "supolka-css",
        plugins: []
    };
};

const SupolkaPlugin = supolkaPluginFactory as SupolkaPlugin;
SupolkaPlugin.postcss = true;

export default SupolkaPlugin;
