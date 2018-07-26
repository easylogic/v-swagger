<template>
    <div class="api">
        <div class="header" @click="open = !open">
            <span class="title">{{apiObj.title}}</span>            
            <span class="host">{{apiObj.host}}</span>            
            <span class="description">{{apiObj.description}}</span>
        </div>

        <div class="table" v-show="isOpen">
            <slot></slot>
            <request v-for="(item, index) in apiObj.request" 
            
                :key="index"
                :method="item.method"
                :url="item.url"
                :description="item.description"
                :headers="item.headers"
                :path="item.path"
                :params="item.params"
                :body="item.body"
             />
             
        </div>
    </div>
</template>

<script>

import request from './request.vue'

export default {
    props: ['host', 'opened', 'title', 'description', 'target'],
    data () {

        var apiObj = {
            host: this.host,
            title: this.title,
            description: this.description,
            opened: this.opened 
        } 
        return {
            apiObj,
            open: apiObj.opened || false,
        }
    },
    computed: {
        isOpen () {
            return this.open 
        }
    },
    components: {
        request
    }
}
</script>

<style scoped lang="scss">
.api  {
    /* background-color: yellow; */

    .header {
        display: flex;
        align-items: center;
        padding: 10px 20px 10px 10px;
        cursor: pointer;
        transition: all .2s;
        border-bottom: 1px solid rgba(59,65,81,.3);
        font-size: 24px;
        margin: 0 0 5px;
        font-family: sans-serif;
        color: #3b4151;        


        .host {
            font-size: 14px;
            font-weight: 400;
            padding: 0 10px;
            font-family: sans-serif;
            color: #3b4151;
            flex: 1;                       
        }

        .title {
            font-weight: 700;
        }

        .description {
            font-size: 14px;
            font-weight: 400;
            flex: 1;
            padding: 0 10px;
            font-family: sans-serif;
            color: #3b4151;
            text-align: right;             
        }

    }
}
</style>
