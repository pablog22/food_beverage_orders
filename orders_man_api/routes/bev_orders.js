var mongoconnection = require('./../db/mongoconnection');
var ObjectID = require('mongodb').ObjectID;

var db = mongoconnection.db;

const ORDER_STATUS_OPEN = 'OPEN';
const ORDER_STATUS_IN_PROGRESS = 'IN_PROGRESS';
const ORDER_STATUS_IN_DELIVERY = 'IN_DELIVERY';
const ORDER_STATUS_DELIVERED = 'DELIVERED';
const ORDER_STATUS_CLOSED = 'CLOSED';
const ORDER_STATUS_CANCELLED = 'CANCELLED';

const statusList = [
    ORDER_STATUS_OPEN,
    ORDER_STATUS_IN_PROGRESS,
    ORDER_STATUS_IN_DELIVERY,
    ORDER_STATUS_DELIVERED,
    ORDER_STATUS_CLOSED,
    ORDER_STATUS_CANCELLED
];

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
exports.putBeverageOrderInProgress = function (req, res) {
    var historyRecord = {status: ORDER_STATUS_IN_PROGRESS, date: new Date()};
    db.collection('beverages_orders').findOneAndUpdate(
        {status : ORDER_STATUS_OPEN},
        {$set: {status: ORDER_STATUS_IN_PROGRESS}, $push: {statusHistory: historyRecord}},
        {returnOriginal: false},
        function (err, result) {
            if (err) {
                res.send(500, { 'error': 
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


// Takes one order and updates its status.
// If one order is found and its status is changed, and a 202 status is returned to the client.
// If no order with specified id is found a 412 status is returned to the client.
// Object retuned by mongodb:
// http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~findAndModifyWriteOpResult
exports.updateBeverageOrderStatus = function (req, res) {
    var orderId = req.params.orderId;
    var newStatus = req.params.newStatus;

    // Checks if the new status is a supported status
    var index = statusList.indexOf(newStatus);
    if (index < 0) {
        // Returns an error
        res.send(412, 'Unsupported status.');
    } else {
        var historyRecord = {status: newStatus, date: new Date()};
        db.collection('beverages_orders').findOneAndUpdate(
            {_id: new ObjectID(orderId)},
            {$set: {status: newStatus}, $push: {statusHistory: historyRecord}},
            {returnOriginal: false},
            function (err, result) {
                if (err) {
                    res.send(500, { 'error': 
                    `An error has occurred while updating the beverage order with id ${orderId}.` });
                } else {
                    var apiRes = {};
                    apiRes.db_result = result;

                    if(result.lastErrorObject.updatedExisting) {
                        apiRes.status = newStatus;
                        apiRes.message = 
                            `Order with id ${orderId} successfully uptated to status ${newStatus}.`;
                        apiRes.order_id = result.value._id;
                        res.send(202, apiRes);
                    } else {
                        apiRes.message = `No order found with id ${orderId}.`;
                        res.send(412, apiRes);
                    }

                }
            });
    }

} // updateBeverageOrderStatus end


// Takes one order and updates its status from one status to another.
// If one order is found and its status is changed, and a 202 status is returned to the client.
// If no order with specified id and status is found a 412 status is returned to the client.
// Object retuned by mongodb:
// http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~findAndModifyWriteOpResult
exports.updateBeverageOrderStatusStrict = function (req, res) {
    var orderId = req.params.orderId;
    var prevStatus = req.params.prevStatus;
    var newStatus = req.params.newStatus;

    // Checks if the new status is a supported status
    var prevStatusIndex = statusList.indexOf(prevStatus);
    var newStatusIndex = statusList.indexOf(newStatus);
    if (prevStatusIndex < 0 || newStatusIndex < 0) {
        // Returns an error
        res.send(412, 'Unsupported status');
    } else {
        var historyRecord = {status: newStatus, date: new Date()};
        db.collection('beverages_orders').findOneAndUpdate(
            {_id: new ObjectID(orderId), status : prevStatus},
            {$set: {status: newStatus}, $push: {statusHistory: historyRecord}},
            {returnOriginal: false},
            function (err, result) {
                if (err) {
                    res.send(500, { 'error': 
                    `An error has occurred while updating the beverage order with id ${orderId}.` });
                } else {
                    var apiRes = {};
                    apiRes.db_result = result;

                    if(result.lastErrorObject.updatedExisting) {
                        apiRes.status = newStatus;
                        apiRes.message = 
                            `Order with id ${orderId} successfully uptated to status ${newStatus}.`;
                        apiRes.order_id = result.value._id;
                        res.send(202, apiRes);
                    } else {
                        apiRes.message = `No order found with id ${orderId} and status ${prevStatus}.`;
                        res.send(412, apiRes);
                    }

                }
            });
    }

} // updateBeverageOrderStatusStrict end