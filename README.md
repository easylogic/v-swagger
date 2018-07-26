# v-swagger
API document component like swagger style 

# Install

```js
npm install v-swagger
```

# Load 

```js
import VSwagger from 'v-swagger'

Vue.use(VSwagger)
or 

components: { 'v-swagger': VSwagger }

```

# Use 

```html
<v-swagger :spec="spec" />
```
```js
 new Vue({
        el: '#app',
        data: {
          spec: {
            host: "https://www.google.com",
            title: "Google Search",
            description: "Hello, API",
            opened: true,
            request: [{
                method: 'get',    // post, delete or put 
                description: "Google Home",
                url: "/"
              }
            ]
          }
        }
      })
```