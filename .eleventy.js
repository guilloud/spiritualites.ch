module.exports = function (eleventyConfig) {

    const markdownIt = require('markdown-it');
    const markdownItAnchor = require('markdown-it-anchor');
    const uslug = require('uslug')
    const uslugify = s => uslug(s)

    eleventyConfig.setLibrary("md",
        markdownIt({
            typographer: true
        }).use(markdownItAnchor, {
            // permalink: true,
            permalinkCLass: "direct-link",
            slugify: uslugify,
            permalinkSymbol: "#"
        })
    );

    eleventyConfig.addLayoutAlias('base', 'layouts/base.liquid');

    const htmlmin = require("html-minifier");

    eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
        if (outputPath.endsWith(".html")) {
            let minified = htmlmin.minify(content, {
                collapseWhitespace: true,
                decodeEntities: true,
                minifyCSS: true,
                minifyJS: true,
                preserveLineBreaks: true,
                removeComments: true,
                sortClassName: true,
                useShortDoctype: true
            });
            return minified;
        }

        return content;
    });

    eleventyConfig.addPassthroughCopy("src/favicon.ico");
    eleventyConfig.addPassthroughCopy("src/robots.txt");
    eleventyConfig.addPassthroughCopy("src/_headers");
    eleventyConfig.addPassthroughCopy("src/img");

    return {
        passthroughFileCopy: true,
        dir: {
            input: "src",
            output: "public"
        }
    };
};