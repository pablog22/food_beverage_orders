var mongoconnection = require('./../db/mongoconnection');
var ObjectID = require('mongodb').ObjectID;

var db = mongoconnection.db;
var coll = db.collection('beverages');

exports.findAll = function (req, res) {
    console.log('Retrieving all beverages.');
    coll.find().toArray(function (err, docs) {
        res.send(docs);
    });
};

exports.addBeverage = function (req, res) {
    var beverage = req.body;
    console.log('Adding beverage: ' + JSON.stringify(beverage));
    coll.insertOne(beverage, 
    function (err, result) {
        if (err) {
            res.send({ 'error': 'An error has occurred whle inserting a new beverage.' });
        } else {
            //console.log('Success: ' + JSON.stringify(result[0]));
            console.log('Success: ' + result.insertedCount + ' documents.');
            res.send(result.ops[0]);
        }
    });
}