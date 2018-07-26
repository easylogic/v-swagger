# v-swagger

API document component like swagger style 

https://easylogic.github.io/v-swagger/index.html

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

# Spec 

Simple API Specification

```js
{
  host: "https://api.xxx.me",
  title: "Market API",
  description: "Market, Transactions",
  opened: true,
  request: [ ... ] 
}
```

## Request 

URL called by http 

```js
{
  method: 'get',    // post, delete or put 
  description: "Retrieve Information List.",
  url: "/trade/list/{id}/{name}",
  headers: [{
    key: "Authorization",
    description: "Bearer {{access_token}}"
  }],
  path: [{
      key: "id",
      items: ["happydeveloper"],
      description: "write a id"
    },
    {
      key: "name",
      description: "This is name"
    }
  ],
  params: [{
    key: "name",
    type: "string",
    description: "query string name",
    required: true
  }],
  body: {
    required: true,
    contentType: "application/json",
    data: {
      "petId": 0,
      "quantity": 0,
      "shipDate": "2018-07-14T14:10:33.646Z",
      "status": "placed",
      "complete": false
    }
  }

}

```