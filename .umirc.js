
const path = require('path')
// ref: https://umijs.org/config/
const px2rem = require('postcss-plugin-px2rem')
const vConsolePlugin = require('vconsole-webpack-plugin');



export default {
  treeShaking: true,
  exportStatic: true,
  hash: true,
  chainWebpack(config, { webpack }) {
    // 设置 alias
    // config.resolve.alias.set('a', 'path/to/a');

    // 删除进度条插件
    // config.plugins.delete('progress');
    // 配置vconsole
    config.plugin('vconsole')
      .use(vConsolePlugin, [{ filter: [], enable: true }])
    // 自定义split-chunks 配置
    // 打印config 配置
    // console.log(config.toString(), 'webpack-config')
  },
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' }
  //     ]
  //   }
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: { webpackChunkName: true, loadingComponent: './components/PageLoading/index' },
      title: 'zhuanye',
      dll: false,
      hd: false,
      fastClick: true,
      targets: {
        android: 5,
        ios: 7,
        chrome: 58,
        ie: 9,
      },
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      metas: [
        {
          name: "apple-mobile-web-app-capable",
          content: "yes"
        },
        {
          "name": "apple-mobile-web-app-status-bar-style",
          "content": "black"
        },
        {
          "http-equiv": 'pragma',
          "content": 'no-cache'
        },
        {
          "http-equiv": "cache-control",
          content: "no-cache, no-store, must-revalidate"
        },
        {
          "http-equiv": "expires",
          "content": "Wed, 26 Feb 1999 08:21:57 GMT"
        },
        {
          "http-equiv": "expires",
          content: "0"
        },
        {
          "name": "format-detection",
          content: "telephone=no"
        },
        {
          name: "format-detection",
          content: "email=no"
        },
      ],
      routes: {
        exclude: [
          /components\//,
          /hooks\//
        ],
      },
    }],
  ],
  extraPostCSSPlugins: [px2rem({ rootValue: 100 })],

}
