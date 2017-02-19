
use pedidos

// Create db indexes
db.beverages.createIndex( { "code": 1 }, { unique: true } )


// Delete all beverages orders
db.beverages_orders.remove({})







////////////////////////////////////////////
// Some beverages

{
  "type": "whisky",
  "brand": "Grants",
  "description": "Grants 750cc",
  "cc": 750,
  "code": "w_grants_750",
  "price": 600
}

{
  "type": "whisky",
  "brand": "Blenders",
  "description": "Blenders 750cc",
  "cc": 750,
  "code": "w_blenders_750",
  "price": 126
}

{
  "type": "whisky",
  "brand": "Blenders",
  "description": "Blenders 1000cc",
  "cc": 1000,
  "code": "w_blenders_1000",
  "price": 154
}


////////////////////////////////////////////
// Some beverages orders

{
  "cust_id": "1",
  "beverages":[
    {
      "code": "w_grants_750",
      "count": 3
    },
    {
      "code": "w_blenders_750",
      "count": 5
    }
  ] 
}

