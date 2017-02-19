
use pedidos

// Create db indexes
db.beverages.createIndex( { "code": 1 }, { unique: true } )

