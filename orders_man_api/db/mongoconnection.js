var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db;

var serverOptions = {
    'auto_reconnect': true,
    'poolSize': 5
};

var server = new Server('localhost', 27017, serverOptions);
db = new Db('food_beverage_orders', server);

db.open(function(err, db) {
    if(!err) {
        console.log(`Worker ${process.pid} - Connected to 'food_beverage_orders' database.`);
    }
});

exports.db = db;