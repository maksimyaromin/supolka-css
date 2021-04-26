import { CssOptions, SupolkaMicroplugin } from "../../types";
import { map, fromPairs } from "lodash";
import { useClassName, parseCss } from "../../utils/css";
import { transformThemeOption } from "../../utils/options";

const creator: SupolkaMicroplugin = ({ theme }) => {
    const option = theme("fontSize") as { [key: string]: number | string };
    const transformValue = transformThemeOption("fontSize");

    const css = fromPairs<CssOptions>(
        map(option, (value, key) => {
            return [
                useClassName("font-size", key),
                {
                    fontSize: transformValue(value)
                }
            ];
        })
    );

    return parseCss(css);
};

export default creator;
