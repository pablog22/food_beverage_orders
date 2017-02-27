var mongoconnection = require('./../db/mongoconnection');
var ObjectID = require('mongodb').ObjectID;

var db = mongoconnection.db;

const ORDER_STATUS_OPEN = 'OPEN';
const ORDER_STATUS_IN_PROGRESS = 'IN_PROGRESS';
const ORDER_STATUS_IN_DELIVERY = 'IN_DELIVERY';
const ORDER_STATUS_DELIVERED = 'DELIVERED';
const ORDER_STATUS_CLOSED = 'CLOSED';

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

exports.findAllBevOrders = function (req, res) {
    console.log('Retrieving all beverages.');
    db.collection('beverages_orders').find().limit(50).toArray(function (err, docs) {
        res.send(docs);
    });
};

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

//
// Takes one order and sets 
// http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~findAndModifyWriteOpResult
exports.getBeverageOrderToProcess = function (req, res) {
    db.collection('beverages_orders').findOneAndUpdate(
        {status : ORDER_STATUS_OPEN},
        {$set: {status: ORDER_STATUS_IN_PROGRESS}},
        {returnOriginal: false},
        function (err, result) {
            if (err) {
                res.send({ 'error': 
                'An error has occurred while setting one beverage order in process.' });
            } else {
                res.send(result);
            }
        });
}