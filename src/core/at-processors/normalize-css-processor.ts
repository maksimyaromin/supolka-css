import { SupolkaAtRuleProcessorFactory } from "../../types";
import { readFile } from "fs/promises";
import { parsePlainCss, updateSource, wrapAt, cleanComments } from "../../utils/css";
import { sectionAt, normalizeChunk } from "../../constants";

const normalizeCssAtRuleProcessor: SupolkaAtRuleProcessorFactory = (at) => {
    return async () => {
        const normalizeCss = await readFile(require.resolve("modern-normalize"), {
            encoding: "utf8"
        });
        const suitCss = await readFile(require.resolve("suitcss-base/lib/base.css"), {
            encoding: "utf8"
        });
        
        const nodes = [
            ...parsePlainCss(normalizeCss).nodes,
            ...parsePlainCss(suitCss).nodes
        ];

        at.after(updateSource(wrapAt(cleanComments(nodes), sectionAt, normalizeChunk), at.source));
    };
};

export default normalizeCssAtRuleProcessor;
