import { SupolkaPluginOptions } from "./types";
import atomicCss from "./plugins/atomic-css";

const options: SupolkaPluginOptions = {
    plugins: {
        atomic: atomicCss
    },
    theme: {
        fontSize: {
            overline: 10,
            caption: 13,
            button: 15,
            body2: 15,
            body1: 17,
            subtitle2: 14,
            subtitle1: 16,
            h6: 20,
            h5: 24,
            h4: 35,
            h3: 49,
            h2: 61,
            h1: 98
        }
    },
    purgeCss: {
        content: [
            {
                raw: `<html><body><div class="font-size-overline"></div></body></html>`,
                extension: "html"
            }
        ],
        preserveHtmlElements: false
    }
};

export default options;
