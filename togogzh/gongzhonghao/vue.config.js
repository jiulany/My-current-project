module.exports = {
    publicPath: './',
    devServer: {
        // open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8080,
        https: false,
        hotOnly: false,
        disableHostCheck: true,
        // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
        proxy: {
            '/api': {                                   //域名   https://testtg.baodi520.com   https://tggzh.baodi520.com
                target: 'https://tgapi.baodi520.com', //https://tgapi.baodi520.com //https://testapi.baodi520.com
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }, // string | Object
    },
    configureWebpack: config => {
        config.externals = {
            'BMap': 'BMap'
        }
    }
}