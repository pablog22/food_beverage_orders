var restify = require('restify');

var mongoUtil = require('./db/mongoUtil');
mongoUtil.connectToServer(function (err) {
  if (!err) {
    console.log(`Connected to 'food_beverage_orders' database.`);

    // Once the connection is established with database, we will continue

    var dummy = require('./routes/dummy');
    var beverages = require('./routes/bev_orders');

    var server = restify.createServer();

    // http://stackoverflow.com/questions/14338683/how-can-i-support-cors-when-using-restify
    server.use(
      function crossOrigin(req,res,next){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        //res.header("Allow", "GET,PUT, POST");
        return next();
      }
    );

    server.use(restify.bodyParser());

    server.get('/dummy100ms', dummy.dummy100ms);

    server.get('/bev_orders/:orderId', beverages.findBevOrder);
    server.get('/bev_orders', beverages.findAllBevOrders);
    server.post('/bev_orders', beverages.addBeverageOrder);
    server.put('/bev_orders_to_progress', beverages.putBeverageOrderInProgress);
    server.put('/bev_orders/:orderId/:newStatus', beverages.updateBeverageOrderStatus);
    server.put('/bev_orders/:orderId/:prevStatus/:newStatus', beverages.updateBeverageOrderStatusStrict);

    server.listen(3001);
    console.log(`Listening on port 3001...`);

  } else {
    console.error(`Fail to connect to database.`);
  }
});
