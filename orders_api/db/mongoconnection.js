var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db;

var serverOptions = {
    'auto_reconnect': true,
    'poolSize': 20
};

var server = new Server('localhost', 27017, serverOptions);
db = new Db('pedidos', server);

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'pedidos' database");
    }
});

exports.db = db;