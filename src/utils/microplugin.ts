import { fromPairs, map } from "lodash";
import { Node } from "postcss";
import { CssOptions, SupolkaTheme } from "../types";
import { useClassName, parseCss } from "./css";
import { transformThemeOption } from "./options";

export const createAtomicMicroplugin = (
    options: SupolkaTheme,
    root: string,
    className: string = root
): Promise<Node[]> => {
    const transformValue = transformThemeOption(root);

    const css = fromPairs<CssOptions>(
        map(options, (value, key) => {
            return [
                useClassName(className, key),
                {
                    [root]: transformValue(value)
                }
            ];
        })
    );

    return parseCss(css);
};
