import { Dictionary, get, map, isArray, tap, isPlainObject, omit, trimEnd } from "lodash";
import { CssOptions, PurgeCssOptions, PurgeCssRawContent, SupolkaPluginOption } from "../types";
import postcss, { AtRule, Comment, Node, Root } from "postcss";
import postcssSelectorParser from "postcss-selector-parser";
import postcssNested from "postcss-nested";
import * as postcssJs from "postcss-js";
import purgecss from "@fullhuman/postcss-purgecss";
import tags from "html-tags";
import { atomicChunk, normalizeChunk, supolkaAt } from "../constants";

export const useClassName = (root: string, mod?: string): string => {
    const className = mod ? `${root}-${mod}` : root;
    return asClass(escapeClassName(className));
};

export function parseCss(css: Dictionary<CssOptions>): Promise<Node[]>;
export function parseCss(css: { [key: string]: SupolkaPluginOption }): Promise<Node[]>;
export function parseCss(css: object): Promise<Node[]> {
    const output = postcss([postcssNested()]).process(css, { parser: postcssJs });

    return Promise.resolve(output.root.nodes);
};

export const parsePlainCss = (input: string): Root => {
    return postcss.parse(input);
};

export const escapeCommas = (className: string) => className.replace(/\\,/g, "\\2c");

export const escapeDots = (className: string) => className.replace(/\./g, "\\2e");

export const escapeClassName = (className: string): string => {
    const node = postcssSelectorParser.className({ value: className });
    return escapeDots(escapeCommas(get(node, "raws.value", node.value)));
};

export const asClass = (className: string): string => `.${className}`;

export const cloneNodes = (nodes: Node[]) => map(nodes, (node) => node.clone());

export const wrapAt = (nodes: Node | Node[], atName: string, atValue: string) =>
    postcss.atRule({ name: atName, params: atValue }).append(cloneNodes(isArray(nodes) ? nodes : [nodes]));

export const updateSource = (nodes: AtRule | AtRule[], source?: any) => {
    return tap(isArray(nodes) ? postcss.root({ nodes }) : nodes, (tree) => tree.walk((node) => (node.source = source)));
};

export const cleanComments = (nodes: Node | Node[]): Node[] => {
    const root = postcss.root({ nodes: isArray(nodes) ? nodes : [nodes] });
    root.walkComments((comment) => {
        comment.remove();
    });
    return root.nodes;
};

export const makeComment = (text: string): Comment => {
    return postcss.comment({ text });
};

export const removeUnusedMarkers = (css: Root): void => {
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

export const removeUnusedStyles = (purge: (string | PurgeCssRawContent)[] | PurgeCssOptions) => {
    const content = isArray(purge) ? purge : (get(purge, "content", []) as string[]);
    const options = isPlainObject(purge) ? omit(purge, ["content"]) : {};

    return postcss([
        (css: Root) => {
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
        purgecss({
            content,
            defaultExtractor: (content: string) => {
                const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
                const broadMatchesWithoutTrailingSlash = broadMatches.map((match) => trimEnd(match, "\\"));
                const preserved = broadMatches.concat(broadMatchesWithoutTrailingSlash);

                const safelist = [...preserved];

                if (get(options, "preserveHtmlElements", true)) {
                    safelist.push(...tags);
                }

                return safelist;
            },
            ...options
        })
    ]);
};

export const toRemCss = (px: number, rootPx = 16): string => {
    const rem = px / rootPx;

    return `${rem}rem`;
};
