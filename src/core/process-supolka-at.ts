import { Root, AtRule } from "postcss";
import { SupolkaAtRuleProcessor, SupolkaPluginOptions } from "../types";
import {
    getAtomicCssAtRuleProcessor,
    getNormalizeCssAtRuleProcessor
} from "./at-processors";
import { supolkaAt, normalizeChunk, atomicChunk } from "../constants";

export default function processSupolkaAt(options: SupolkaPluginOptions) {
    return (root: Root) => {
        const processors: SupolkaAtRuleProcessor[] = [];

        root.walkAtRules(supolkaAt, (at: AtRule) => {
            switch (at.params) {
                case atomicChunk:
                    processors.push(getAtomicCssAtRuleProcessor(at, options));
                    break;
                case normalizeChunk:
                    processors.push(getNormalizeCssAtRuleProcessor(at));
                    break;
            }
        });

        return Promise.all([
            ...processors.map(processor => processor())
        ]) as unknown as Promise<void>;
    };
};
