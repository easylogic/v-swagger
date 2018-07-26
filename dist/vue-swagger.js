(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.VueSwagger = {})));
}(this, (function (exports) { 'use strict';

(function(){ if(typeof document !== 'undefined'){ var head=document.head||document.getElementsByTagName('head')[0], style=document.createElement('style'), css=".api[data-v-3ab0010c] { /* background-color: yellow; */ } .api .header[data-v-3ab0010c] { display: flex; align-items: center; padding: 10px 20px 10px 10px; cursor: pointer; transition: all .2s; border-bottom: 1px solid rgba(59, 65, 81, 0.3); font-size: 24px; margin: 0 0 5px; font-family: sans-serif; color: #3b4151; } .api .header .host[data-v-3ab0010c] { font-size: 14px; font-weight: 400; padding: 0 10px; font-family: sans-serif; color: #3b4151; flex: 1; } .api .header .title[data-v-3ab0010c] { font-weight: 700; } .api .header .description[data-v-3ab0010c] { font-size: 14px; font-weight: 400; flex: 1; padding: 0 10px; font-family: sans-serif; color: #3b4151; text-align: right; } "; style.type='text/css'; if (style.styleSheet){ style.styleSheet.cssText = css; } else { style.appendChild(document.createTextNode(css)); } head.appendChild(style); } })();



























var component$1 = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"api"},[_c('div',{staticClass:"header",on:{"click":function($event){_vm.open = !_vm.open;}}},[_c('span',{staticClass:"title"},[_vm._v(_vm._s(_vm.apiObj.title))]),_vm._v(" "),_c('span',{staticClass:"host"},[_vm._v(_vm._s(_vm.apiObj.host))]),_vm._v(" "),_c('span',{staticClass:"description"},[_vm._v(_vm._s(_vm.apiObj.description))])]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isOpen),expression:"isOpen"}],staticClass:"table"},[_vm._t("default"),_vm._v(" "),_vm._l((_vm.apiObj.request),function(item,index){return _c('request',{key:index,attrs:{"method":item.method,"url":item.url,"description":item.description,"headers":item.headers,"path":item.path,"params":item.params,"body":item.body}})})],2)])},staticRenderFns: [],_scopeId: 'data-v-3ab0010c',
    props: ['host', 'opened', 'title', 'description', 'target'],
    data: function data () {

        var apiObj = {
            host: this.host,
            title: this.title,
            description: this.description,
            opened: this.opened 
        }; 
        return {
            apiObj: apiObj,
            open: apiObj.opened || false,
        }
    },
    computed: {
        isOpen: function isOpen () {
            return this.open 
        }
    } 
}

function install (Vue) {
    if (install.installed) { return; } 

    install.installed = true;

    Vue.component('VueSwagger', component$1);
}

var plugin = {
    install: install,
};

var GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

exports.install = install;
exports['default'] = component$1;

Object.defineProperty(exports, '__esModule', { value: true });

})));
