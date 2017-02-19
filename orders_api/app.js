const express = require('express')
const bodyParser= require('body-parser')
const beverages = require('./routes/beverages');


const app = express();

app.use(bodyParser.json());

/////////
// Routes

app.get('/beverages', beverages.findAll);
// app.get('/beverages/:id', beverages.findById);
app.post('/beverages', beverages.addBeverage);
// app.put('/beverages/:id', beverages.updateWine);
// app.delete('/beverages/:id', beverages.deleteWine);


///////////////////////////////////
// Starts a UNIX socket and listens 
// for connections on the given path
app.listen(3000);
console.log('Listening on port 3000...');