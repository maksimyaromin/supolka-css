import {
    Plugin,
    PluginCreator,
    Root,
    LazyResult,
    AtRule,
    Node
} from "postcss";

export type SupolkaPluginOption = number | string | object | (number | string)[];
export interface SupolkaTheme {
    [key: string]: SupolkaPluginOption
}
export interface PurgeCssRawContent {
    raw: string;
    extension: string;
}
export interface PurgeCssOptions {
    content: (string | PurgeCssRawContent)[];
    preserveHtmlElements?: boolean;
}
export interface SupolkaPluginOptions {
    plugins: {
        atomic: SupolkaMicroplugin[]
    },
    theme: SupolkaTheme;
    purgeCss?: boolean | (string | PurgeCssRawContent)[] | PurgeCssOptions;
}
export type SupolkaPluginOptionsFactory = () => SupolkaPluginOptions;

export type SupolkaPluginFactory = (options?: SupolkaPluginOptions) => Plugin;
export type SupolkaPlugin = PluginCreator<SupolkaPluginOptions>;

export type SupolkaRootProcessor = (css: Root) => LazyResult;
export type SupolkaAtRuleProcessor = () => Promise<void>;
export type SupolkaAtRuleProcessorFactory = (at: AtRule, options?: SupolkaPluginOptions) => SupolkaAtRuleProcessor;

export type ThemeFunction = (key: string, defaultOption?: SupolkaPluginOption) => SupolkaPluginOption;
export interface SupolkaMicropluginOptions {
    theme: ThemeFunction;
    key?: string;
}
export type SupolkaMicroplugin = (options: SupolkaMicropluginOptions) => Promise<Node[]>;

export interface CssOptions {
    [key: string]: number | string;
}
