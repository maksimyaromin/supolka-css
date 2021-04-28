import { SupolkaPluginOptions } from "../types";
import postcssFunctions from "postcss-functions";
import { getTheme } from "../utils/options";
import { toRemCss } from "../utils/css";

export default function processSupolkaFunctions(options: SupolkaPluginOptions) {
    const theme = getTheme(options);

    return postcssFunctions({
        functions: {
            theme: theme,
            rem: (px: number) => {
                const rootPx = theme("root.spacing", 16) as number;

                return toRemCss(px, rootPx);
            },
            spacing: (ratio: number) => {
                const rootPx = theme("root.spacing", 16) as number;
                const rootDP = theme("root.spacingDP", 4) as number;

                return toRemCss(ratio * rootDP, rootPx);
            }
        }
    });
}
