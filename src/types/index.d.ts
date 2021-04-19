import { Plugin, PluginCreator } from "postcss";

export interface SupolkaPluginOptions {
    includeAtomicCss: boolean;
}

export type SupolkaPluginFactory = (options: SupolkaPluginOptions) => Plugin;
export type SupolkaPlugin = PluginCreator<SupolkaPluginOptions>;
