import { SupolkaPluginOptions } from "../types";
import postcssFunctions from "postcss-functions";
import { getTheme } from "../utils/options";

export default function processSupolkaFunctions(options: SupolkaPluginOptions) {
    return postcssFunctions({
        functions: {
            theme: getTheme(options)
        }
    });
};
