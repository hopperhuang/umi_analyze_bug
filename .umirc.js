
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
    config.merge({
      optimization: {
        splitChunks: {
          cacheGroups: {
            // antd, react, umi 等不会变动的缓存
            commons: {
              name: 'commons_1',
              test: /[\\/]node_modules[\\/](react|react-dom|umi-hd|antd-mobile)[\\/]/,
              priority: -5, // 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0
              chunks: 'all',
              minChunks: 1,
            },
            // common: { // 这个不是默认的，我自己加的
            //   filename: '[name].bundle.js', // chunks 为 initial 时有效。在 manifest 中最后会是 '[name].js': [name].bundle.js。在 umi 中该项默认值是 [name].async.js，webpack 默认值是 [name].js。
            //   name: 'common', // 和 filename 的作用类似
            //   chunks: 'initial',
            //   minChunks: 1,
            //   enforce: true, // 不管 maxInitialRequest maxAsyncRequests maxSize minSize 怎么样都会生成这个 chunk
            // },
            // node_modules 中少变动的缓存
            vendors: {
              test: /[\\/]node_modules[\\/]/, // test 符合这个规则的才会加到对应的 group 中
              priority: -10, // 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0
              reuseExistingChunk: true
            },
            // 其他
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true // 如果该chunk包含的modules都已经另一个被分割的chunk中存在，那么直接引用已存在的chunk，不会再重新产生一个
            },
          }
        },
      }
    });
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
