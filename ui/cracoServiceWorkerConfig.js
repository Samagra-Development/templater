const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const path = require("path");

module.exports = {
    overrideWebpackConfig: ({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
        const isEnvDevelopment = env === "development";
        if (isEnvDevelopment) {
            const newConfig = {
                ...webpackConfig,
                plugins: [
                    ...webpackConfig.plugins,
                    isEnvDevelopment &&
                    new WorkboxWebpackPlugin.InjectManifest({
                        swSrc: path.resolve(__dirname, "src/service-worker.js"),
                        dontCacheBustURLsMatching: /\.[0-9a-f]{8}\./,
                        exclude: [/\.map$/, /asset-manifest\.json$/, /LICENSE/],
                        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
                    }),
                ],
            };
            return newConfig;
        } else {
            return webpackConfig;
        }
        // Always return the config object.
    },
};
