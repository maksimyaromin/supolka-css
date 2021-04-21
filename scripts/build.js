const rollup = require("rollup");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const { existsSync, mkdirSync } = require("fs");
const { readFile, writeFile } = require("fs/promises");

async function buildCss(filename, supolkaPlugin) {
    const css = await readFile(`src/css/${filename}.css`);

    const { css: outputCss } = await postcss([
        supolkaPlugin(),
        autoprefixer()
    ])
        .process(css, {
            from: `src/css/${filename}.css`,
            to: `dist/supolka/${filename}.css`
        });
    
    await writeFile(`dist/supolka/${filename}.css`, outputCss);
};

async function buildSupolkaPlugin() {
    const bundle = await rollup.rollup({
        input: {
            "supolka-postcss": "src/index.ts"
        },
        plugins: [
            typescript()
        ],
        external: [
            "postcss",
            "postcss-js",
            "postcss-nested",
            "postcss-functions",
            "postcss-selector-parser",
            "@fullhuman/postcss-purgecss",
            "lodash",
            "fs/promises",
            "html-tags"
        ]
    });

    await bundle.write({
        format: "cjs",
        sourcemap: true,
        dir: "dist",
        exports: "auto",
        chunkFileNames: "microplugins/[name].js",
        manualChunks: (id) => {
            const match = /plugins\\micro\\(.*)\.ts/i.exec(id);
            
            if (match) {
                const microplugin = match[1];
                return `microplugin.${microplugin}`;
            }
        }
    });
    await bundle.close();
};

buildSupolkaPlugin()
    .then(() => import("../dist/supolka-postcss.js"))
    .then(({ default: supolkaCss }) => {
        if (!existsSync("dist/supolka")) {
            mkdirSync("dist/supolka", { recursive: true });
        }

        return Promise.all([
            buildCss("atomic", supolkaCss),
            buildCss("normalize", supolkaCss),
            buildCss("supolka", supolkaCss)
        ]);
    })
    .then(() => console.log("Done"));
