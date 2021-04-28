import { SupolkaPluginOptions } from "./types";
import atomicCss from "./plugins/atomic-css";
import { rem, spacing } from "./utils/options";
import { common } from "./theme/palette";

const options: SupolkaPluginOptions = {
    plugins: {
        atomic: atomicCss
    },
    theme: {
        spacing: {
            0: spacing(0),
            ".5": spacing(.5),
            1: spacing(1),
            2: spacing(2),
            3: spacing(3),
            4: spacing(4),
            5: spacing(5),
            6: spacing(6),
            7: spacing(7),
            8: spacing(8),
            9: spacing(9),
            10: spacing(10),
            12: spacing(12),
            24: spacing(24)
        },
        fontFamily: {
            sans: [
                "ui-sans-serif",
                "system-ui",
                "-apple-system",
                "BlinkMacSystemFont",
                `"Segoe UI"`,
                "Roboto",
                `"Helvetica Neue"`,
                "Arial",
                `"Noto Sans"`,
                "sans-serif",
                `"Apple Color Emoji"`,
                `"Segoe UI Emoji"`,
                `"Segoe UI Symbol"`,
                `"Noto Color Emoji"`
            ],
            mono: [
                "ui-monospace",
                "SFMono-Regular",
                "Menlo",
                "Monaco",
                "Consolas",
                `"Liberation Mono"`,
                `"Courier New"`,
                "monospace"
            ],
            headline: (theme) => ([
                "Raleway",
                ...theme("fontFamily.sans")
            ]),
            body: (theme) => ([
                "Lato",
                ...theme("fontFamily.sans")
            ])
        },
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
        fontWeight: {
            thin: 100,
            extralight: 200,
            light: 300,
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
            extrabold: 800,
            black: 900
        },
        margin: (theme) => ({
            "auto": "auto",
            ...theme("spacing")
        }),
        padding: (theme) => ({
            ...theme("spacing")
        }),

        extends: {
            normalize: {
                html: {
                    fontSize: (theme) => theme("root.spacing"),
                    "-ms-text-size-adjust": "100%",
                    "-webkit-tap-highlight-color": (theme) => `rgba(${theme("colors.black")}, 0)`,
                    "-webkit-text-size-adjust": "100%"
                },
                body: {
                    backgroundColor: (theme) => theme("colors.black"),
                    color: (theme) => theme("colors.white"),
                    fontFamily:`theme(fontFamily.body)`,
                    "overflow-y": "scroll",
                    "overscroll-behavior-y": "none"
                }
            }
        },
        root: {
            spacing: 16,
            spacingDP: 4
        },
        colors: {
            black: common.black,
            white: common.white
        }
    },
    purgeCss: false
};

export default options;
