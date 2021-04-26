import { CssOptions, SupolkaMicroplugin } from "../../types";
import { isPlainObject, Dictionary } from "lodash";
import { parseCss } from "../../utils/css";

const creator: SupolkaMicroplugin = ({ theme, key }) => {
    const extendsCss = theme(`extends.${key}`) as Dictionary<CssOptions> | undefined;

    if (!isPlainObject(extendsCss)) {
        return Promise.resolve([]);
    }

    return parseCss(extendsCss);
};

export default creator;
