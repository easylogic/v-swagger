const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')

const plugins = [
    vue({
        css: true,
        compileTemplate: true
    }),
    babel({
        exclude: 'node_modules/**'
    }),        
    nodeResolve({ browser: true, jsnext: true }),
    buble({
        exclude: 'node_modules/**'
    }),
    commonjs()
]
  

module.exports = {
    input: 'src/wrapper.js',
    output: {
        name: 'VueSwagger',
        exports: 'named',
    },
    sourceMap: true,
    plugins,
    watch: {
        chokidar: false
    }
}