import { SupolkaAtRuleProcessorFactory, SupolkaPluginOption } from "../../types";
import { readFile } from "fs/promises";
import { parsePlainCss, updateSource, wrapAt, cleanComments } from "../../utils/css";
import { sectionAt, normalizeChunk } from "../../constants";
import extend from "../../plugins/micro/extends";
import { getTheme } from "../../utils/options";

const normalizeCssAtRuleProcessor: SupolkaAtRuleProcessorFactory = (at, options) => {
    return async () => {
        const normalizeCss = await readFile(require.resolve("modern-normalize"), {
            encoding: "utf8"
        });
        const suitCss = await readFile(require.resolve("suitcss-base/lib/base.css"), {
            encoding: "utf8"
        });

        const theme = getTheme(options);
        const extendingNodes = await extend({
            theme: (key: string, defaultOption?: SupolkaPluginOption) => theme(key, defaultOption),
            key: "normalize"
        });

        const nodes = [...parsePlainCss(normalizeCss).nodes, ...parsePlainCss(suitCss).nodes, ...extendingNodes];

        at.after(updateSource(wrapAt(cleanComments(nodes), sectionAt, normalizeChunk), at.source));
    };
};

export default normalizeCssAtRuleProcessor;
