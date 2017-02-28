// ORDER_STATUS_IN_PROGRESS => ORDER_STATUS_IN_DELIVERY
// Takes one order and sets it to be processed.
// If one order is found and its status is changed, and a 202 status is returned to the client.
// If no open order is found a 412 status is returned to the client.
// Object retuned by mongodb:
// http://mongodb.github.io/node-mongodb-native/2.2/api/Collection.html#~findAndModifyWriteOpResult
exports.setBeverageOrderToInDelivery = function (req, res) {
    var orderId = req.params.orderId;
    var historyRecord = {status: ORDER_STATUS_IN_DELIVERY, date: new Date()};
    db.collection('beverages_orders').findOneAndUpdate(
        {_id: new ObjectID(orderId), status : ORDER_STATUS_IN_PROGRESS},
        {$set: {status: ORDER_STATUS_IN_DELIVERY}, $push: {statusHistory: historyRecord}},
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