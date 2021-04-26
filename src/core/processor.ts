import postcss from "postcss";
import { get } from "lodash";
import { SupolkaPluginOptions, SupolkaRootProcessor } from "../types";
import { default as getSupolkaAtRuleProcessor } from "./process-supolka-at";
import { default as getSupolkaFunctionsProcessor } from "./process-supolka-functions";
import { default as getSectionAtRuleProcessor } from "./process-section-at";
import { default as getUnusedProcessor } from "./process-unused";

export default function supolkaProcess(options: SupolkaPluginOptions): SupolkaRootProcessor {
    return (css) =>
        postcss(
            getSupolkaAtRuleProcessor(options),
            getSupolkaFunctionsProcessor(options),
            getSectionAtRuleProcessor(),
            getUnusedProcessor(options)
        ).process(css, {
            from: get(css, "source.input.file")
        });
}
