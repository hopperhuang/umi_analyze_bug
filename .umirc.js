
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
        // 通过更改chunkid 算法优化缓存
        // https://gitmemory.com/issue/tpai/tpai.github.io/93/520283012
        // https://webpack.js.org/configuration/optimization/#optimizationchunkids
        // chunkIds: 'named',
        moduleIds: 'hashed',
        runtimeChunk: 'single',
        splitChunks: {
          cacheGroups: {
            // antd, react, umi-hd umi-request knb 等不会变动的缓存,
            // 不建议在以后开发的过程中，修改commons 缓存组，而是增加commons缓存组
            "commons_4": {
              name: 'commons_4',
              test: /[\\/]node_modules[\\/](react-dom)[\\/]/,
              priority: -3, // 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0
              chunks: 'all',
              minChunks: 1,
              enforce: true,
              reuseExistingChunk: true
            },
            "commons_1": {
              name: 'commons_1',
              test: /[\\/]node_modules[\\/](react)[\\/]/,
              priority: -3, // 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0
              chunks: 'all',
              minChunks: 1,
              enforce: true
            },
            "commons_5": {
              name: 'commons_5',
              test: /[\\/]node_modules[\\/](umi-hd)[\\/]/,
              priority: -3, // 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0
              chunks: 'all',
              minChunks: 1,
              enforce: true
            },
            "commons_6": {
              name: 'commons_6',
              test: /[\\/]node_modules[\\/](umi-request)[\\/]/,
              priority: -3, // 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0
              chunks: 'all',
              minChunks: 1,
              enforce: true
            },
            // 和antv dataset
            "commons_2": {
              name: 'commons_2',
              priority: -4, // 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0,
              chunks: 'all',
              test: /[\\/]node_modules[\\/](@antv\/f2\/lib\/core|@antv\/data-set)[\\/]/,
              minChunks: 1
            },
            // 因为f2的包构成比较复杂，所以将f2独立分割，以免在增加f2的模块使用时，影响vendor
            // 同时页防止其他公共模块被使用时，影响到f2的再次加载
            "commons_3" : {
              name: 'commons_3',
              priority: -4, // 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0,
              chunks: 'all',
              test: /[\\/]node_modules[\\/]@antv\/f2[\\/]/,
              minChunks: 3
            },
            // node_modules 中的公共库
            vendors: {
              test: /[\\/]node_modules[\\/]/, // test 符合这个规则的才会加到对应的 group 中
              priority: -10, // 一个模块可能属于多个 chunkGroup，这里是优先级，自定义的 group 是 0
              reuseExistingChunk: true,
              minChunks: 2, // 被chunk共享2次或以上 则打入vendors
            },
            // 其他 页面或组件级别的公共 chunk
            default: {
              minChunks: 3, // 被chunk 共享三次或以上
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
  extraBabelPlugins: [
    "transform-es2017-object-entries"
  ]
}
