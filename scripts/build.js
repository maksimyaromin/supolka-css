const rollup = require("rollup");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("postcss");
const { existsSync, mkdirSync } = require("fs");
const { readFile, writeFile } = require("fs/promises");

async function buildCss(filename, supolkaPlugin) {
    const css = await readFile(`src/css/${filename}.css`);

    const { css: outputCss } = await postcss([supolkaPlugin()])
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
        ]
    });

    await bundle.write({
        format: "cjs",
        sourcemap: true,
        dir: "dist",
        exports: "auto"
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
            buildCss("atomic", supolkaCss)
        ]);
    })
    .then(() => console.log("Done"));

