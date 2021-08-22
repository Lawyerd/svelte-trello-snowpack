// /** @type {import("snowpack").SnowpackUserConfig } */
// 스노우팩 빌드 도구의 구성 옵션을 설정
const production = process.env.NODE_ENV === "production";
// const xxx = require("svelte-preprocess");
// import sveltePreprocess from "svelte-preprocess";
// import autoprefixer from "autoprefixer";
function babelOptions() {
  return { plugins: production ? ["transform-revmove-console"] : [] };
}

module.exports = {
  mount: {
    public: "/", // public이라는 디렉토리를 의미, 우리 프로젝트의 root로 지정
    src: "/dist", // 우리 프로젝트 구성에서 보이는 src 디렉토리, 이 src 디렉토리를 프로젝트를 동작하는 src로 활용할 것인데 그 src는 /dist에 넣어주세요
    // index.html에 /dist가 있다.
  },
  plugins: [
    [
      "@snowpack/plugin-svelte",
      {
        preprocess: require("svelte-preprocess")({
          // snowpack/plugin-svelte를 설치하면 svelte-preprocess는 내장되어 있다.
          // 따라서 따로 설치할 필요가 없다.

          // 또한 snowpack은 scss와 관련된 plugin을 따로 제공한다.

          // scss가 있다면, 전역에 걸쳐서 해당 scss 적용
          // 단 해당 컴포넌트 style에 lang='scss'가 명시되어 있는 경우에만
          scss: {
            prependData: '@import "./src/scss/main.scss";',
          },
          postcss: {
            plugins: [require("autoprefixer")()],
          },
          babel: babelOptions(),
        }),
      },
    ],
    [
      "@snowpack/plugin-babel",
      {
        transformOptions: babelOptions(),
      },
    ],
    "@snowpack/plugin-dotenv",
    "@snowpack/plugin-sass",
    "@snowpack/plugin-optimize",
  ],
  alias: {
    "~": "./src",
  },
  // 연결된 플러그인들을 적는다.
  // dotenv : 스벨트에서 기본적으로 제공하는 환경 변수를 사용할 수 있는 모듈
  // 보면 템플릿이 정말 단순하다는 것을 알 수 있다.
};
