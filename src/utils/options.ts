import { SupolkaPluginOption, SupolkaPluginOptions, SupolkaPluginOptionsFactory, SupolkaTheme } from "../types";
import { get, toPath, isFunction, isPlainObject, defaults, isArray } from "lodash";

export const resolveOptions = (getOptions: SupolkaPluginOptionsFactory) => {
    const options = getOptions();

    const theme = get(options, "theme", {}) as SupolkaTheme;
    return defaults(
        {
            theme: resolveFunctionKeys(theme, options)
        },
        options
    );
};

export const resolveFunctionKeys = (theme: SupolkaTheme, options: SupolkaPluginOptions) => {
    return Object.keys(theme).reduce((resolved, key) => {
        const value = isPlainObject(theme[key])
            ? resolveFunctionKeys(theme[key] as SupolkaTheme, options)
            : isFunction(theme[key])
            ? (theme[key] as any)(getTheme(options, false))
            : theme[key];

        return defaults({ [key]: value }, resolved);
    }, {});
};

export const getOption = (
    options: SupolkaPluginOptions,
    key: string | string[],
    defaultOption?: SupolkaPluginOption
): SupolkaPluginOption | undefined => get(options, key, defaultOption);

export const transformThemeOption = (rootKey: string) => {
    if (["fontFamily"].includes(rootKey)) {
        return (option: SupolkaPluginOption | undefined) => (isArray(option) ? option.join(", ") : option || "");
    }

    return (option: SupolkaPluginOption | undefined) => (isFunction(option) ? option() : option || "");
};

export const getTheme = (options: SupolkaPluginOptions, useTransformation = true) => (
    key: string,
    defaultOption?: SupolkaPluginOption
): SupolkaPluginOption => {
    const [rootKey, ...keys] = toPath(key);
    const option = getOption(options, ["theme", rootKey, ...keys], defaultOption);

    return useTransformation ? transformThemeOption(rootKey)(option) : option;
};

export const rem = (px: TemplateStringsArray) => `rem(${px})`;

export const spacing = (ratio = 0) => `spacing(${ratio})`;
