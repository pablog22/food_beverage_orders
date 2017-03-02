var MongoClient = require('mongodb').MongoClient;

var _db;

module.exports = {

  connectToServer: function (callback) {
    MongoClient.connect("mongodb://localhost:27017/food_beverage_orders", function (err, db) {
      _db = db;
      return callback(err);
    });
  },

  getDb: function () {
    console.log(`Getting db connection ${_db}`);
    return _db;
  }
};