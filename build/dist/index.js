import * as __SNOWPACK_ENV__ from '../_snowpack/env.js';
import.meta.env = __SNOWPACK_ENV__;

// 진입점이 되는 파일이다. index.html에 명시해야하는 파일
import App from "./App.svelte.js";

let app = new App({
  target: document.body,
});

export default app;

// Hot Module Replacement (HMR) : 프로젝트에서 어떤 내용이 변경되면 브라우저에 바로 반영이 되는 것
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (undefined /* [snowpack] import.meta.hot */ ) {
  undefined /* [snowpack] import.meta.hot */ .accept();
  undefined /* [snowpack] import.meta.hot */ .dispose(() => {
    app.$destroy();
  });
}
