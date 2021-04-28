import { assign, reduce } from "lodash";
import { SupolkaMicroplugin, SupolkaPluginOption, SupolkaTheme } from "../../types";
import { useClassName, parseCss } from "../../utils/css";
import { transformThemeOption } from "../../utils/options";

const creator: SupolkaMicroplugin = ({ theme }) => {
    const root = "padding";
    const options = theme(root) as SupolkaTheme;
    const transformValue = transformThemeOption(root);

    const css: { [key: string]: SupolkaPluginOption } = reduce(options, (output, value, key) => {
        return assign(
            output,
            {
                [useClassName("p", key)]: {
                    "padding": transformValue(value)
                },
                [useClassName("px", key)]: {
                    "padding-left": transformValue(value),
                    "padding-right": transformValue(value)
                },
                [useClassName("py", key)]: {
                    "padding-bottom": transformValue(value),
                    "padding-top": transformValue(value)
                },
                [useClassName("pt", key)]: {
                    "padding-top": transformValue(value)
                },
                [useClassName("pr", key)]: {
                    "padding-right": transformValue(value)
                },
                [useClassName("pb", key)]: {
                    "padding-bottom": transformValue(value)
                },
                [useClassName("pl", key)]: {
                    "padding-left": transformValue(value)
                }
            }
        );
    }, {});

    return parseCss(css);
};

export default creator;
