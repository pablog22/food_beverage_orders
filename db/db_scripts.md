
use food_beverage_orders

// Create db indexes
db.beverages.createIndex( { "code": 1 }, { unique: true } )


// Delete all beverages orders
db.beverages_orders.remove({})


// Go wherever your json fis is and:
mongoimport /v --jsonArray --db food_beverage_orders --collection beverages --file beverages.json




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

