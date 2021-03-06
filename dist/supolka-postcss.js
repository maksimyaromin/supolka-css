'use strict';

var microplugin_fontSize = require('./microplugins/microplugin.font-size.js');
var microplugin_fontWeight = require('./microplugins/microplugin.font-weight.js');
var microplugin_fontFamily = require('./microplugins/microplugin.font-family.js');
var microplugin_margin = require('./microplugins/microplugin.margin.js');
var microplugin_padding = require('./microplugins/microplugin.padding.js');
var postcss = require('postcss');
var lodash = require('lodash');
var promises = require('fs/promises');
var microplugin_extends = require('./microplugins/microplugin.extends.js');
var postcssFunctions = require('postcss-functions');
require('postcss-selector-parser');
require('postcss-nested');
require('postcss-js');
require('@fullhuman/postcss-purgecss');
require('html-tags');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var postcssFunctions__default = /*#__PURE__*/_interopDefaultLegacy(postcssFunctions);

var atomicCss = [
    microplugin_fontFamily.creator,
    microplugin_fontSize.creator,
    microplugin_fontWeight.creator,
    microplugin_margin.creator,
    microplugin_padding.creator
];

var common = {
    black: "#000000",
    white: "#ffffff"
};

const options = {
    plugins: {
        atomic: atomicCss
    },
    theme: {
        spacing: {
            0: microplugin_fontSize.spacing(0),
            ".5": microplugin_fontSize.spacing(.5),
            1: microplugin_fontSize.spacing(1),
            2: microplugin_fontSize.spacing(2),
            3: microplugin_fontSize.spacing(3),
            4: microplugin_fontSize.spacing(4),
            5: microplugin_fontSize.spacing(5),
            6: microplugin_fontSize.spacing(6),
            7: microplugin_fontSize.spacing(7),
            8: microplugin_fontSize.spacing(8),
            9: microplugin_fontSize.spacing(9),
            10: microplugin_fontSize.spacing(10),
            12: microplugin_fontSize.spacing(12),
            24: microplugin_fontSize.spacing(24)
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
            overline: microplugin_fontSize.rem `10`,
            caption: microplugin_fontSize.rem `13`,
            button: microplugin_fontSize.rem `15`,
            body2: microplugin_fontSize.rem `15`,
            body1: microplugin_fontSize.rem `17`,
            subtitle2: microplugin_fontSize.rem `14`,
            subtitle1: microplugin_fontSize.rem `16`,
            h6: microplugin_fontSize.rem `20`,
            h5: microplugin_fontSize.rem `24`,
            h4: microplugin_fontSize.rem `35`,
            h3: microplugin_fontSize.rem `49`,
            h2: microplugin_fontSize.rem `61`,
            h1: microplugin_fontSize.rem `98`
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
        margin: (theme) => (Object.assign({ "auto": "auto" }, theme("spacing"))),
        padding: (theme) => (Object.assign({}, theme("spacing"))),
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
                    fontFamily: `theme(fontFamily.body)`,
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

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const atomicCssAtRuleProcessor = (at, options) => {
    const plugins = lodash.get(options, "plugins.atomic", []);
    const theme = microplugin_fontSize.getTheme(options);
    const execute = () => Promise.all([
        ...plugins.map((plugin) => plugin({
            theme: (key, defaultOption) => theme(key, defaultOption)
        }))
    ]).then((nodes) => {
        const wrappedNodes = lodash.map(nodes, (node) => microplugin_fontSize.wrapAt(node, microplugin_fontSize.sectionAt, microplugin_fontSize.atomicChunk));
        return lodash.concat([], ...wrappedNodes);
    });
    return () => __awaiter(void 0, void 0, void 0, function* () {
        const nodes = yield execute();
        at.after(microplugin_fontSize.updateSource(nodes, at.source));
    });
};

const normalizeCssAtRuleProcessor = (at, options) => {
    return () => __awaiter(void 0, void 0, void 0, function* () {
        const normalizeCss = yield promises.readFile(require.resolve("modern-normalize"), {
            encoding: "utf8"
        });
        const suitCss = yield promises.readFile(require.resolve("suitcss-base/lib/base.css"), {
            encoding: "utf8"
        });
        const theme = microplugin_fontSize.getTheme(options);
        const extendingNodes = yield microplugin_extends.creator({
            theme: (key, defaultOption) => theme(key, defaultOption),
            key: "normalize"
        });
        const nodes = [...microplugin_fontSize.parsePlainCss(normalizeCss).nodes, ...microplugin_fontSize.parsePlainCss(suitCss).nodes, ...extendingNodes];
        at.after(microplugin_fontSize.updateSource(microplugin_fontSize.wrapAt(microplugin_fontSize.cleanComments(nodes), microplugin_fontSize.sectionAt, microplugin_fontSize.normalizeChunk), at.source));
    });
};

function processSupolkaAt(options) {
    return (root) => {
        const processors = [];
        root.walkAtRules(microplugin_fontSize.supolkaAt, (at) => {
            switch (at.params) {
                case microplugin_fontSize.atomicChunk:
                    processors.push(atomicCssAtRuleProcessor(at, options));
                    break;
                case microplugin_fontSize.normalizeChunk:
                    processors.push(normalizeCssAtRuleProcessor(at, options));
                    break;
            }
        });
        return Promise.all([...processors.map((processor) => processor())]);
    };
}

function processSupolkaFunctions(options) {
    const theme = microplugin_fontSize.getTheme(options);
    return postcssFunctions__default['default']({
        functions: {
            theme: theme,
            rem: (px) => {
                const rootPx = theme("root.spacing", 16);
                return microplugin_fontSize.toRemCss(px, rootPx);
            },
            spacing: (ratio) => {
                const rootPx = theme("root.spacing", 16);
                const rootDP = theme("root.spacingDP", 4);
                return microplugin_fontSize.toRemCss(ratio * rootDP, rootPx);
            }
        }
    });
}

function processSectionAt() {
    return (root) => {
        root.walkAtRules(microplugin_fontSize.sectionAt, (at) => {
            const sectionName = at.params;
            at.before(microplugin_fontSize.makeComment(`${sectionName} BEGIN`));
            at.before(at.nodes);
            at.before(microplugin_fontSize.makeComment(`${sectionName} END`));
            at.remove();
        });
    };
}

function processUnused(options) {
    const purge = lodash.get(options, "purgeCss", false);
    if (!purge) {
        return microplugin_fontSize.removeUnusedMarkers;
    }
    return microplugin_fontSize.removeUnusedStyles(purge);
}

function supolkaProcess(options) {
    return (css) => postcss__default['default'](processSupolkaAt(options), processSupolkaFunctions(options), processSectionAt(), processUnused(options)).process(css, {
        from: lodash.get(css, "source.input.file")
    });
}

const supolkaPluginFactory = (options$1) => {
    const getOptions = () => (Object.assign(Object.assign({}, options), options$1));
    const resolvedOptions = microplugin_fontSize.resolveOptions(getOptions);
    return {
        postcssPlugin: "supolka-css",
        plugins: [supolkaProcess(resolvedOptions)]
    };
};
const SupolkaPlugin = supolkaPluginFactory;
SupolkaPlugin.postcss = true;

module.exports = SupolkaPlugin;
//# sourceMappingURL=supolka-postcss.js.map
