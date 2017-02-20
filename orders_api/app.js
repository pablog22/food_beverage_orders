const express = require('express')
const bodyParser= require('body-parser')
const beverages = require('./routes/beverages');

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

const app = express();

app.use(bodyParser.json());

/////////
// Routes

app.get('/beverages', beverages.findAll);
// app.get('/beverages/:id', beverages.findById);
app.post('/beverages', beverages.addBeverage);
// app.put('/beverages/:id', beverages.updateWine);
// app.delete('/beverages/:id', beverages.deleteWine);
app.get('/bev_orders', beverages.findAllBevOrders);
app.post('/bev_orders', beverages.addBeverageOrder);

///////////////////////////////////
// Starts a UNIX socket and listens 
// for connections on the given path
app.listen(3000);
console.log('Listening on port 3000...');

}


