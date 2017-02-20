var restify = require('restify');
var beverages = require('./routes/beverages');

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

var server = restify.createServer();
server.use(restify.bodyParser());

server.get('/beverages', beverages.findAll);
server.post('/beverages', beverages.addBeverage);
server.get('/bev_orders', beverages.findAllBevOrders);
server.post('/bev_orders', beverages.addBeverageOrder);

server.listen(3000);
console.log('Listening on port 3000...');

}


