import { SupolkaPluginOptions } from "./types";
import atomicCss from "./plugins/atomic-css";
import { rem } from "./utils/options";
import { common } from "./theme/palette";

const options: SupolkaPluginOptions = {
    plugins: {
        atomic: atomicCss
    },
    theme: {
        fontSize: {
            overline: rem`10`,
            caption: rem`13`,
            button: rem`15`,
            body2: rem`15`,
            body1: rem`17`,
            subtitle2: rem`14`,
            subtitle1: rem`16`,
            h6: rem`20`,
            h5: rem`24`,
            h4: rem`35`,
            h3: rem`49`,
            h2: rem`61`,
            h1: rem`98`
        },
        extends: {
            normalize: {
                html: {
                    fontSize: (theme) => theme("root.fontSize"),
                    "-ms-text-size-adjust": "100%",
                    "-webkit-tap-highlight-color": (theme) => `rgba(${theme("colors.black")}, 0)`,
                    "-webkit-text-size-adjust": "100%"
                },
                body: {}
            }
        },
        root: {
            fontSize: 16
        },
        colors: {
            black: common.black
        }
    },
    purgeCss: false
};

export default options;
