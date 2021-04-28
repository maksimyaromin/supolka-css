'use strict';

var lodash = require('lodash');
var postcss = require('postcss');
var postcssSelectorParser = require('postcss-selector-parser');
var postcssNested = require('postcss-nested');
var postcssJs = require('postcss-js');
var purgecss = require('@fullhuman/postcss-purgecss');
var tags = require('html-tags');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var postcss__default = /*#__PURE__*/_interopDefaultLegacy(postcss);
var postcssSelectorParser__default = /*#__PURE__*/_interopDefaultLegacy(postcssSelectorParser);
var postcssNested__default = /*#__PURE__*/_interopDefaultLegacy(postcssNested);
var postcssJs__namespace = /*#__PURE__*/_interopNamespace(postcssJs);
var purgecss__default = /*#__PURE__*/_interopDefaultLegacy(purgecss);
var tags__default = /*#__PURE__*/_interopDefaultLegacy(tags);

const supolkaAt = "supolka";
const sectionAt = "section";
const normalizeChunk = "normalize-css";
const atomicChunk = "atomic-css";

const useClassName = (root, mod) => {
    const className = mod ? `${root}-${mod}` : root;
    return asClass(escapeClassName(className));
};
function parseCss(css) {
    const output = postcss__default['default']([postcssNested__default['default']()]).process(css, { parser: postcssJs__namespace });
    return Promise.resolve(output.root.nodes);
}
const parsePlainCss = (input) => {
    return postcss__default['default'].parse(input);
};
const escapeCommas = (className) => className.replace(/\\,/g, "\\2c");
const escapeDots = (className) => className.replace(/\./g, "\\2e");
const escapeClassName = (className) => {
    const node = postcssSelectorParser__default['default'].className({ value: className });
    return escapeDots(escapeCommas(lodash.get(node, "raws.value", node.value)));
};
const asClass = (className) => `.${className}`;
const cloneNodes = (nodes) => lodash.map(nodes, (node) => node.clone());
const wrapAt = (nodes, atName, atValue) => postcss__default['default'].atRule({ name: atName, params: atValue }).append(cloneNodes(lodash.isArray(nodes) ? nodes : [nodes]));
const updateSource = (nodes, source) => {
    return lodash.tap(lodash.isArray(nodes) ? postcss__default['default'].root({ nodes }) : nodes, (tree) => tree.walk((node) => (node.source = source)));
};
const cleanComments = (nodes) => {
    const root = postcss__default['default'].root({ nodes: lodash.isArray(nodes) ? nodes : [nodes] });
    root.walkComments((comment) => {
        comment.remove();
    });
    return root.nodes;
};
const makeComment = (text) => {
    return postcss__default['default'].comment({ text });
};
const removeUnusedMarkers = (css) => {
    css.walkAtRules(supolkaAt, (at) => {
        at.remove();
    });
    css.walkComments((comment) => {
        switch (comment.text.trim()) {
            case `${normalizeChunk} BEGIN`:
            case `${normalizeChunk} END`:
            case `${atomicChunk} BEGIN`:
            case `${atomicChunk} END`:
                comment.remove();
                break;
        }
    });
};
const removeUnusedStyles = (purge) => {
    const content = lodash.isArray(purge) ? purge : lodash.get(purge, "content", []);
    const options = lodash.isPlainObject(purge) ? lodash.omit(purge, ["content"]) : {};
    return postcss__default['default']([
        (css) => {
            css.walkComments((comment) => {
                switch (comment.text.trim()) {
                    case `${normalizeChunk} BEGIN`:
                        comment.after(makeComment("purgecss start ignore"));
                        break;
                    case `${normalizeChunk} END`:
                        comment.before(makeComment("purgecss end ignore"));
                        break;
                }
            });
        },
        removeUnusedMarkers,
        purgecss__default['default'](Object.assign({ content, defaultExtractor: (content) => {
                const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
                const broadMatchesWithoutTrailingSlash = broadMatches.map((match) => lodash.trimEnd(match, "\\"));
                const preserved = broadMatches.concat(broadMatchesWithoutTrailingSlash);
                const safelist = [...preserved];
                if (lodash.get(options, "preserveHtmlElements", true)) {
                    safelist.push(...tags__default['default']);
                }
                return safelist;
            } }, options))
    ]);
};
const toRemCss = (px, rootPx = 16) => {
    const rem = px / rootPx;
    return `${rem}rem`;
};

const resolveOptions = (getOptions) => {
    const options = getOptions();
    const theme = lodash.get(options, "theme", {});
    return lodash.defaults({
        theme: resolveFunctionKeys(theme, options)
    }, options);
};
const resolveFunctionKeys = (theme, options) => {
    return Object.keys(theme).reduce((resolved, key) => {
        const value = lodash.isPlainObject(theme[key])
            ? resolveFunctionKeys(theme[key], options)
            : lodash.isFunction(theme[key])
                ? theme[key](getTheme(options, false))
                : theme[key];
        return lodash.defaults({ [key]: value }, resolved);
    }, {});
};
const getOption = (options, key, defaultOption) => lodash.get(options, key, defaultOption);
const transformThemeOption = (rootKey) => {
    if (["fontFamily"].includes(rootKey)) {
        return (option) => (lodash.isArray(option) ? option.join(", ") : option || "");
    }
    return (option) => (lodash.isFunction(option) ? option() : option || "");
};
const getTheme = (options, useTransformation = true) => (key, defaultOption) => {
    const [rootKey, ...keys] = lodash.toPath(key);
    const option = getOption(options, ["theme", rootKey, ...keys], defaultOption);
    return useTransformation ? transformThemeOption(rootKey)(option) : option;
};
const rem = (px) => `rem(${px})`;
const spacing = (ratio = 0) => `spacing(${ratio})`;

const createAtomicMicroplugin = (options, root, className = root) => {
    const transformValue = transformThemeOption(root);
    const css = lodash.fromPairs(lodash.map(options, (value, key) => {
        return [
            useClassName(className, key),
            {
                [root]: transformValue(value)
            }
        ];
    }));
    return parseCss(css);
};

const creator = ({ theme }) => {
    const options = theme("fontSize");
    return createAtomicMicroplugin(options, "fontSize", "fs");
};

exports.atomicChunk = atomicChunk;
exports.cleanComments = cleanComments;
exports.createAtomicMicroplugin = createAtomicMicroplugin;
exports.creator = creator;
exports.getTheme = getTheme;
exports.makeComment = makeComment;
exports.normalizeChunk = normalizeChunk;
exports.parseCss = parseCss;
exports.parsePlainCss = parsePlainCss;
exports.rem = rem;
exports.removeUnusedMarkers = removeUnusedMarkers;
exports.removeUnusedStyles = removeUnusedStyles;
exports.resolveOptions = resolveOptions;
exports.sectionAt = sectionAt;
exports.spacing = spacing;
exports.supolkaAt = supolkaAt;
exports.toRemCss = toRemCss;
exports.transformThemeOption = transformThemeOption;
exports.updateSource = updateSource;
exports.useClassName = useClassName;
exports.wrapAt = wrapAt;
//# sourceMappingURL=microplugin.font-size.js.map
