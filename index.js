const http = require('http');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'moments';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')


var whitelist = ['http://localhost:4200', ]
var corsOptions = {
  origin: function (origin, callback) {

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//creating server
var server = http.createServer(app);

//set server
app.set('server', server);
app.use(express.static(__dirname + '/uploads'));
app.use(cors(corsOptions))


//add bodyparser for json 
app.use(
  bodyParser.json({
    limit: '20mb',
  })
);


//connect mongodb
mongoose.connect(
    dbUrl+'/'+dbName,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function (err, conn) {
      if (!err) {
        console.log('Database connected');
      } else {
        console.log('Not connected to db');
      }
    }
  );

//listen server
app.listen(port,()=>{
console.log('server running');
})

require('./_routes/route')(app); 