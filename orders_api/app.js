var restify = require('restify');

const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('online', function (worker) {
    console.log(`Worker ${worker.process.pid} is online.`);
  });

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
    console.log('Starting a new worker');
    cluster.fork();
  });
} else {

  //////////////
  // Worker code

  var mongoUtil = require('./db/mongoUtil');
  mongoUtil.connectToServer(function (err) {
    if (!err) {
      console.log(`Worker ${process.pid} - Connected to 'food_beverage_orders' database.`);

      // Once the connection is established with database, we will continue
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
      //server.post('/beverages', beverages.addBeverage);
      server.post('/bev_orders', beverages.addBeverageOrder);

      server.listen(3000);
      console.log(`Worker ${process.pid} - Listening on port 3000...`);

    } else {
      console.error(`Worker ${process.pid} - Fail to connect to database.`);
    }
  });


}


