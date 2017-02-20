var mongoconnection = require('./../db/mongoconnection');
var ObjectID = require('mongodb').ObjectID;

var db = mongoconnection.db;
var bevcoll = db.collection('beverages');
var ordercoll = db.collection('beverages_orders');

exports.findAll = function (req, res) {
    console.log('Retrieving all beverages.');
    bevcoll.find().toArray(function (err, docs) {
        res.send(docs);
    });
};

exports.addBeverage = function (req, res) {
    var beverage = req.body;
    console.log('Adding beverage: ' + JSON.stringify(beverage));
    bevcoll.insertOne(beverage, 
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

exports.findAllBevOrders = function (req, res) {
    console.log('Retrieving all beverages.');
    ordercoll.find().toArray(function (err, docs) {
        res.send(docs);
    });
};

exports.addBeverageOrder = function (req, res) {
    var order = req.body;
    //console.log('Adding beverage order: ' + JSON.stringify(order));
    ordercoll.insertOne(order, 
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