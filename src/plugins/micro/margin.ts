import { assign, reduce } from "lodash";
import { SupolkaMicroplugin, SupolkaPluginOption, SupolkaTheme } from "../../types";
import { useClassName, parseCss } from "../../utils/css";
import { transformThemeOption } from "../../utils/options";

const creator: SupolkaMicroplugin = ({ theme }) => {
    const root = "margin";
    const options = theme(root) as SupolkaTheme;
    const transformValue = transformThemeOption(root);

    const css: { [key: string]: SupolkaPluginOption } = reduce(options, (output, value, key) => {
        return assign(
            output,
            {
                [useClassName("m", key)]: {
                    "margin": transformValue(value)
                },
                [useClassName("mx", key)]: {
                    "margin-left": transformValue(value),
                    "margin-right": transformValue(value)
                },
                [useClassName("my", key)]: {
                    "margin-bottom": transformValue(value),
                    "margin-top": transformValue(value)
                },
                [useClassName("mt", key)]: {
                    "margin-top": transformValue(value)
                },
                [useClassName("mr", key)]: {
                    "margin-right": transformValue(value)
                },
                [useClassName("mb", key)]: {
                    "margin-bottom": transformValue(value)
                },
                [useClassName("ml", key)]: {
                    "margin-left": transformValue(value)
                }
            }
        );
    }, {});

    return parseCss(css);
};

export default creator;
