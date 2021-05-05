const HtmlWebpackPlugin = require('html-webpack-plugin')
const { inlineSource } = require('inline-source')

class HtmlWebpackInlinePlugin {
  constructor (options) {
    this.options = options
  }

  apply (compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackInlinePlugin', (compilation) => {
      let hooks = HtmlWebpackPlugin.getHooks(compilation)

      hooks.beforeEmit.tapAsync('Inline', (htmlPluginData, cb) => {
        let { options } = this
        let { html } = htmlPluginData

        inlineSource(html, options)
          .then((html) => {
            htmlPluginData.html = html
            cb(null, htmlPluginData)
          })
          .catch((err) => {
            cb(err)
          })
      })
    })
  }
}

module.exports = HtmlWebpackInlinePlugin
