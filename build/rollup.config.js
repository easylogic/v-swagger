const vue = require('rollup-plugin-vue')
const buble = require('rollup-plugin-buble')
const babel = require('rollup-plugin-babel')
const commonjs = require('rollup-plugin-commonjs')
const nodeResolve = require('rollup-plugin-node-resolve')
const globals = require('rollup-plugin-node-globals')

const plugins = [
    vue({
        css: true,
        compileTemplate: true
    }),
    babel({
        exclude: 'node_modules/**',
        runtimeHelpers: true 
    }),        
    nodeResolve({ browser: true, jsnext: true }),
    buble({
        exclude: 'node_modules/**'
    }),
    commonjs({
        // non-CommonJS modules will be ignored, but you can also
        // specifically include/exclude files
        include: 'node_modules/**',  // Default: undefined
        browser: true,
        preferBuiltins: false,
        // if true then uses of `global` won't be dealt with by this plugin
        ignoreGlobal: false,  // Default: false

        // if false then skip sourceMap generation for CommonJS modules
        sourceMap: false  // Default: true

        // explicitly specify unresolvable named exports
        // (see below for more details)
        // namedExports: { './module.js': ['foo', 'bar' ] }  // Default: undefined
    }),
    globals()
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