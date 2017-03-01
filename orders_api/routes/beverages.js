var mongoconnection = require('./../db/mongoconnection');
var ObjectID = require('mongodb').ObjectID;

var db = mongoconnection.db;

const ORDER_STATUS_OPEN = 'OPEN';

exports.findAll = function (req, res) {
    console.log('Retrieving all beverages.');
    db.collection('beverages').find().toArray(function (err, docs) {
        res.send(docs);
    });
};

exports.addBeverage = function (req, res) {
    var beverage = req.body;
    console.log('Adding beverage: ' + JSON.stringify(beverage));
    db.collection('beverages').insertOne(beverage, 
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

exports.addBeverageOrder = function (req, res) {
    var order = req.body;
    order.status = ORDER_STATUS_OPEN;
    order.creationDate = new Date();
    //console.log('Adding beverage order: ' + JSON.stringify(order));
    db.collection('beverages_orders').insertOne(order, 
    function (err, result) {
        if (err) {
            res.send({ 'error': 'An error has occurred whle inserting a new beverage order.' });
        } else {
            //console.log('Success: ' + JSON.stringify(result[0]));
            //console.log('Success: ' + result.insertedCount + ' documents.');
            res.send(result.ops[0]);
        }
    });
}