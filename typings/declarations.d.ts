import { Plugin } from "postcss";

declare module "postcss-js" {
    const parser: {
        objectify: () => any;
        parse: () => any;
        async: () => any;
        sync: () => any;
    };

    export = parser;
}

declare module "postcss-functions/dest/index" {
    const functions: () => Plugin;

    export default functions;
}
