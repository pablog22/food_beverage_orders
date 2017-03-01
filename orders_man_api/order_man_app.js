var restify = require('restify');

/////////
// Routes

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




