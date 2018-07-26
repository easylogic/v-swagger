export default {
    host: "https://api.xxx.me",
    title: "Market API",
    description: "Market, Transactions",
    opened: true,
    request: [{
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
          description: "이름입니다.",
          required: true
        }],
        body: {
          required: true,
          contentType: "application/json",
          "data": {
  
            "petId": 0,
            "quantity": 0,
            "shipDate": "2018-07-14T14:10:33.646Z",
            "status": "placed",
            "complete": false
          }
        }
  
      }
    ]
  }