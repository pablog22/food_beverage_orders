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

exports.findBevOrder = function (req, res) {
    var orderId = req.params.orderId;
    console.log(`Retrieving beverage order ${orderId}`);
    db.collection('beverages_orders').findOne({_id: new ObjectID(orderId)}, function (err, result) {
        res.send(result);
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

// ORDER_STATUS_OPEN => ORDER_STATUS_IN_PROGRESS
// Takes one order and sets it to be processed.
// If one order is found and its status is changed, and a 202 status is returned to the client.
// If no open order is found a 412 status is returned to the client.
// Object retuned by mongodb:
// http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~findAndModifyWriteOpResult
exports.getBeverageOrderToProcess = function (req, res) {
    db.collection('beverages_orders').findOneAndUpdate(
        {status : ORDER_STATUS_OPEN},
        {$set: {status: ORDER_STATUS_IN_PROGRESS, inProgressDate: new Date()}},
        {returnOriginal: false},
        function (err, result) {
            if (err) {
                res.send({ 'error': 
                'An error has occurred while setting one beverage order in process.' });
            } else {
                var apiRes = {};
                apiRes.db_result = result;

                if(result.lastErrorObject.updatedExisting) {
                    apiRes.status = ORDER_STATUS_IN_PROGRESS;
                    apiRes.message = 'Order successfully uptated to be processed.';
                    apiRes.order_id = result.value._id;
                    res.send(202, apiRes);
                } else {
                    apiRes.message = 'No order open to be processed.';
                    res.send(412, apiRes);
                }

            }
        });
}

// ORDER_STATUS_IN_PROGRESS => ORDER_STATUS_IN_DELIVERY
// Takes one order and sets it to be processed.
// If one order is found and its status is changed, and a 202 status is returned to the client.
// If no open order is found a 412 status is returned to the client.
// Object retuned by mongodb:
// http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~findAndModifyWriteOpResult
exports.setBeverageOrderToInDelivery = function (req, res) {
    var orderId = req.params.orderId;
    db.collection('beverages_orders').findOneAndUpdate(
        {_id: new ObjectID(orderId), status : ORDER_STATUS_IN_PROGRESS},
        {$set: {status: ORDER_STATUS_IN_DELIVERY, inDeliveryDate: new Date()}},
        {returnOriginal: false},
        function (err, result) {
            if (err) {
                res.send({ 'error': 
                'An error has occurred while setting one beverage order in delivery status.' });
            } else {
                var apiRes = {};
                apiRes.db_result = result;

                if(result.lastErrorObject.updatedExisting) {
                    apiRes.status = ORDER_STATUS_IN_DELIVERY;
                    apiRes.message = 'Order successfully uptated to in delivery.';
                    apiRes.order_id = result.value._id;
                    res.send(202, apiRes);
                } else {
                    apiRes.message = 'No order with that id and required status.';
                    res.send(412, apiRes);
                }

            }
        });
}