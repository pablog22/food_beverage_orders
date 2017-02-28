var restify = require('restify');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

/////////
// Routes

var dummy = require('./routes/dummy');
var beverages = require('./routes/beverages');

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
server.get('/beverages', beverages.findAll);
server.post('/beverages', beverages.addBeverage);
server.get('/bev_orders/:orderId', beverages.findBevOrder);
server.get('/bev_orders', beverages.findAllBevOrders);
server.post('/bev_orders', beverages.addBeverageOrder);
server.put('/bev_orders_to_process', beverages.getBeverageOrderToProcess);
// server.put('/bev_orders/:orderId/IN_DELIVERY', beverages.setBeverageOrderToInDelivery);
server.put('/bev_orders/:orderId/:newStatus', beverages.updateBeverageOrderStatus);

server.listen(3000);
console.log(`Worker ${process.pid} - Listening on port 3000...`);

}


