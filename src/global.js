// 这里引入全局js
// https://umijs.org/zh/guide/app-structure.html#src-global-js-ts
import './api/polyfill'
import vw from 'umi-hd/lib/vw';
import extendRequest from './utils/request.js';


// 打点引入再此

// https://github.com/umijs/umi-hd
vw(100, 375);
window.addEventListener('resize', () => {
  vw(100, 375);
})

window.extendRequest = extendRequest
