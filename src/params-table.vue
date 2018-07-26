<template>
    <div class="parameters">
        <div class="section-header">
            <div class="tab-header">
                <h1>Parameters</h1>
            </div>
            <div class="try-out" v-if="!execute"><button class="btn" @click="execute = true">Try it out </button></div>
            <div class="try-out" v-if="execute"><button class="btn cancel" @click="execute = false">Cancel</button></div>
        </div>
        <div class="table-container">
            <table>
            <tr>
                <th>Name</th>
                <th>Description</th>
            </tr>
            <tr v-for="(item, index) in dataParameters" :key="index">
                <td class="vtop">
                    <div class="parameter-name">{{item.key}}<span class="required" v-if="item.required">* required</span></div>
                    <div class="parameter-type" v-if="item.type">{{item.type}}</div>
                    <div class="source">({{item.source}})</div>
                </td>
                <td class="vtop">
                    <div class="description" v-if="item.description">{{item.description}}</div>
                    <div class="data" v-if="item.dataValue && !isExecute">
                        <pre>{{item.dataValue}}</pre>
                    </div>                    
                    <div class="value-input" v-if="isExecute && item.source !== 'body'">
                        <select v-if="item.items" v-model="item.inputValue"> 
                            <option v-for="(enumData, selectedItemIndex) in item.items" :key="selectedItemIndex" :value="enumData.value" selected="enumData.selected">{{enumData.text}}</option>
                        </select>
                        <div class="params" v-else-if="item.source === 'header' && item.params.length">
                            <div class="param-item" v-for="(param, paramIndex) in item.params" :key="paramIndex">
                                <span>{{param.key}}</span>
                                <input type="text" :placeholder="getPlaceholder(param)" v-model="param.value" />
                            </div>

                        </div>

                        <input  v-else type="text" :placeholder="getPlaceholder(item)" v-model="item.inputValue" />
                    </div>
                    <div class="value-input" v-if="isExecute && item.source === 'body'">
                        <textarea :placeholder="getPlaceholder(item)" v-model="item.dataValue"></textarea>                    
                    </div>
                    <div class="value-input" v-if="item.contentType">
                        <div class="title">Parameter content type</div>
                        <select v-model="item.contentType">
                            <option :value="item.contentType">{{item.contentType}}</option>
                        </select>
                    </div>                        

                </td>
            </tr>
            <tr v-if="params.length === 0">
                <td colspan="2" class="no-items">No Parameters.</td>
            </tr>
            </table>
            <div class="execute-wrapper" v-show="isExecute">
                <button class="btn execute" @click="runApi">Execute</button>
            </div>         
        </div>
        <div class="section-header" v-if="lastResponseData">
            <div class="tab-header">
                <h1>Response</h1>
            </div>
            <div class="try-out">
                <div v-show="showCopyResult" :class="{'copy-result': true, success: isCopySuccess}">Successfully copied</div>
                <button class="btn" @click="copyToClipboard">Copy</button>
            </div>
        </div>
        <div v-if="lastResponseData">
            <div class="response">
                <pre id="responseData">{{JSON.stringify(lastResponseData, null, 4)}}</pre>
            </div>
        </div>
        <div v-if="lastErrorMessage">
            <div class="response error">
                <pre>{{JSON.stringify(lastErrorMessage, null, 4)}}</pre>
            </div>
        </div>        
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['params'],
    data () {
        return {
            execute: false,
            lastResponseData: null,
            lastErrorMessage: null,
            dataParameters: this.params || [],
            isCopySuccess: false,
            showCopyResult: false
        }
    },
    computed: {
        isExecute () {
            return this.execute
        }
    },
    methods: {
        async runApi () {

            const call = axios.create()

            var self = this 
            call.interceptors.response.use((response) => {
                return response;
            }, function (error) {
                
                // Do something with response error
                if (error.response.status === 401) {
                }


                return Promise.reject(error.response);
            });            

            const url = [this.$parent.spec.host, this.getUrl()].join('');

            const config = {
                url,
                method: this.$parent.method,
                headers: this.getHeaders(),
                params: this.getParams(),
                data: this.getData()
            }

            try {
                let response = await call.request(config)

                this.success(response.data)
            } catch (e) {
                // this.error(e.message)
            }

        },
        success (data) {
            this.lastResponseData = data
            this.lastErrorMessage = null
        },
        error (data) {
            this.lastResponseData = null
            this.lastErrorMessage = data
        },
        getData () {
            let body = {}

            body = this.dataParameters.filter(it => {
                return it.source.includes('body')
            })[0];

            if (!body) return {}

            return JSON.parse(body.dataValue) || {}
        },
        getParams () {
            let params = {}

            this.dataParameters.filter(it => {
                return it.source.includes('query')
            }).forEach(it => {
                params[it.key] = it.inputValue
            });

            return params
        },
        getUrl () {

            let url = this.$parent.url 

            this.dataParameters.filter(it => {
                return it.source.includes('path')
            }).forEach(it => {
                url = url.replace(new RegExp(`{${it.key}}`, 'g'), it.inputValue || '')
            });

            return url;
        },     
        getHeaders () {
            let headers = {}

            this.dataParameters.filter(it => {
                return it.source.includes('header')
            }).forEach(it => {
                headers[it.key] = this.getHeadersByVariable(it)
            });

            return headers
        },
        getHeadersByVariable (it) {

            if (it.params.length) {
                let description = it.description
                it.params.forEach(p => {
                    description = description.replace(new RegExp(`{{${p.key}}}`, 'g'), p.value || '')
                })

                return description
            }

            return it.inputValue
        },
        getValue (item) {
            let arr = []
        },
        getPlaceholder (item) {
            let arr = [item.key, item.description]

            return arr.join(' - ')
        },
        async copyToClipboard (event) {
          try {
                let textData = JSON.stringify(this.lastResponseData, null, 4)

                if (!navigator.clipboard) {
                    let el = document.getElementById('clipboard-area')
                    if (!el) {
                        el = document.createElement('textarea')
                        el.id = 'clipboard-area'
                        el.style.position = 'absolute'
                        el.style.left = '-10000px'
                        event.target.parentElement.appendChild(el)
                    }
                    el.value = textData
                    el.select()
                    document.execCommand('copy')
                } else {
                    await navigator.clipboard.writeText(textData)
                }

                this.isCopySuccess = true
                this.showCopyResult = true
                setTimeout(() => this.showCopyResult = false, 1000)
            } catch (e) {
                this.isCopySuccess = false
            }
        }
    }
}
</script>

<style scoped lang='scss'>

table {
    display: table;
    border:0px;
    margin: 0px;
    border-collapse: collapse;
    width: 100%;
    padding: 0 10px;

    tr, td, th {
        border:0px;
        background-color: transparent;
        padding: 0.6em 0em;
    }

    th {
        font-size: 12px;
        font-weight: 700;
        padding: 12px 0;
        text-align: left;
        border-bottom: 1px solid rgba(59,65,81,.2);
        font-family: sans-serif;
        color: #3b4151;
    }

    .no-items {
        font-size: 12px;
    }
}

.source {
    color: gray;
    font-size: 11px;
}

.section-header {
    padding: 8px 20px;
    min-height: 50px;
    background: hsla(0,0%,100%,.8);
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    display: flex;
    align-items: center;    
    box-sizing: border-box;

    .tab-header {
        display: flex;
        flex: 1;

        h1 {
            font-size: 14px;
            flex: 1;
            margin: 0;
            font-family: sans-serif;
            color: #3b4151;
        }
    }
}

.table-container {
    padding: 20px;
}

.btn {
    font-size: 14px;
    font-weight: 700;
    padding: 5px 23px;
    transition: all .3s;
    border: 2px solid gray;
    border-radius: 4px;
    background: transparent;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    font-family: sans-serif;
    color: #3b4151;
    cursor: pointer;

    &.cancel {
        border-color: #ff6060;
        background-color: transparent;
        font-family: sans-serif;
        color: #ff6060;
    }

    &.execute {
        background-color: #4990e2;
        color: #fff;
        border-color: #4990e2;
    }
}
.execute-wrapper .btn {
    width: 100%;
    padding: 8px 40px;
}

.parameter-name {
    font-size: 16px;
    font-weight: 700;
    font-family: sans-serif;
    color: #3b4151;
    vertical-align: middle;

    .required {
        font-size: 10px;
        padding: 5px;
        vertical-align: middle;
        color: rgba(255,0,0,.6);        
    }
}

.parameter-type {
    font-size: 12px;
    padding: 5px 0;
    font-family: monospace;
    font-weight: 600;
    color: #3b4151;
}

.data {
    font-size: 12px;
}

.vtop {
    vertical-align: top;
}

.value-input {
    margin-top: 2px;
    input[type=text] {
        padding: 8px 10px;
        border-radius: 4px;
        border:1px solid #ececec;
        width: 240px;
    }

    textarea {
        padding: 8px 10px;
        border-radius: 4px;
        border:1px solid #ececec;
        width: 90%;
        height: 110px;
        max-width: 100%;
    }

    .title {
        font-size: 12px;
        font-weight: 700;
        margin-bottom: 5px;
    }

    select {
        font-size: 14px;
        font-weight: 700;
        padding: 5px 40px 5px 10px;
        height: 34px;
        width: 180px;
        box-sizing: border-box;
        border: 2px solid #41444e;
        border-radius: 4px;
        background: #f7f7f7 url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCI+ICAgIDxwYXRoIGQ9Ik0xMy40MTggNy44NTljLjI3MS0uMjY4LjcwOS0uMjY4Ljk3OCAwIC4yNy4yNjguMjcyLjcwMSAwIC45NjlsLTMuOTA4IDMuODNjLS4yNy4yNjgtLjcwNy4yNjgtLjk3OSAwbC0zLjkwOC0zLjgzYy0uMjctLjI2Ny0uMjctLjcwMSAwLS45NjkuMjcxLS4yNjguNzA5LS4yNjguOTc4IDBMMTAgMTFsMy40MTgtMy4xNDF6Ii8+PC9zdmc+") right 10px center no-repeat;
        background-size: 20px;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.25);
        font-family: Titillium Web,sans-serif;
        color: #3b4151;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
}

.params {
    margin-top: 5px;

    .param-item {
        span {
            font-size: 12px;
            margin-right: 10px;
            font-weight: 700;
        }
    }
}

.copy-result {
    display: inline-block;
    margin-right: 15px;

    &.success {
        color: #4990e2;
    }
}
.response {
    font-size: 12px;
    height: 200px;
    overflow: auto;
    margin-bottom: 10px;
    pre {
        padding: 10px;
        background-color: transparent;
    }

    &.error {
        background-color: rgba(255, 0, 0, 0.3);
        margin: 0px 20px;
        margin-bottom: 20px;
        border-radius: 3px;
        box-sizing: border-box;
    }
}

</style>
