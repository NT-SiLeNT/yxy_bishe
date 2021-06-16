
module.exports = {
  // publicPath: './', // 基本路径
  // outputDir: 'dist', // 输出文件目录
  // assetsDir: "static", //放置生成的静态文件目录（js css img）
  // productionSourceMap: false, // 生产环境是否生成 sourceMap 文件

  // chainWebpack: config => {
  //   config.resolve.alias
  //     .set('@', resolve('src'))
  //     .set('assets', resolve('src/assets'))
  //     .set('components', resolve('src/components'))
  // },
  //解决这个报错 WARNING: asset size limit: The following asset(s) exceed the recommended size limit (244 KiB).
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {// 为生产环境修改配置...
      config.mode = 'production';
      config["performance"] = {//打包文件大小配置
        "maxEntrypointSize": 10000000,//入口起点的最大体积 整数类型以字节为单位
        "maxAssetSize": 30000000,//生成问价的最大体积 整数类型 一字节为单位 300k
      }
    }
  }
}