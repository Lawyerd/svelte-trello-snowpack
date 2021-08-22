const production = process.env.NODE_ENV;
function babelOptions() {
  return {plugins: production ? ["transform-revmove-console"] : []};
}
export default {
  mount: {
    public: {url: "/", static: true},
    src: {url: "/dist"}
  },
  plugins: [
    [
      "@snowpack/plugin-svelte",
      {
        preprocess: require("svelte-preprocess")({
          scss: {
            prependData: '@import "./src/scss/main.scss";'
          },
          postcss: {
            plugins: [require("autoprefixer")()]
          },
          babel: babelOptions
        })
      }
    ],
    [
      "@snowpack/plugin-babel",
      {
        transformOptions: babelOptions
      }
    ],
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-sass",
    "@snowpack/plugin-optimize"
  ],
  alias: {
    "~": "./src"
  }
};
