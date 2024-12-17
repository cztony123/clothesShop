const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.1.8:3080/', // dev地址
                changeOrigin: true,
                pathRewrite: {
                  '^/api': '/api'
                }
            }
        }
    }
})