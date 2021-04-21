import { SupolkaAtRuleProcessorFactory, SupolkaMicroplugin, SupolkaPluginOption } from "../../types";
import { get, concat, map } from "lodash";
import { getTheme } from "../../utils/options";
import { wrapAt, updateSource } from "../../utils/css";
import { sectionAt, atomicChunk } from "../../constants";

const atomicCssAtRuleProcessor: SupolkaAtRuleProcessorFactory = (at, options) => {
    const plugins = get(options, "plugins.atomic", []) as SupolkaMicroplugin[];
    const theme = getTheme(options);
    const execute = () => Promise.all([
        ...plugins.map(plugin => plugin({
            theme: (key: string, defaultOption?: SupolkaPluginOption) =>
                theme(key, defaultOption)
        }))
    ]).then(nodes => {
        const wrappedNodes = map(nodes, (node) => wrapAt(node, sectionAt, atomicChunk));
        return concat([], ...wrappedNodes);
    });

    return async () => {
        const nodes = await execute();
        at.after(updateSource(nodes, at.source));
    };
};

export default atomicCssAtRuleProcessor;
