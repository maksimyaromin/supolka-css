import { SupolkaPluginOptions } from "../types";
import postcssFunctions from "postcss-functions";
import { getTheme } from "../utils/options";

export default function processSupolkaFunctions(options: SupolkaPluginOptions) {
    const theme = getTheme(options);

    return postcssFunctions({
        functions: {
            theme: theme,
            rem: (px: number) => {
                const rootPx = theme("root.fontSize", 16) as number;
                const rem = px / rootPx;

                return `${rem}rem`;
            }
        }
    });
}
