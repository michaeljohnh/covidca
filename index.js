const express = require ('express');
const cors = require ('cors');
const bodyParser =require ('body-parser');
const mongoose = require ('mongoose');

var debug = require('debug')('loc8r:server');
var http = require('http');
var path = require('path');


const app = express();
const router = express.Router();
const apiRouter = require('./routes/routes');

const dbURI = 'mongodb+srv://michaelh:P6LqVssXCO8dMT9M@cluster0-b1ubn.mongodb.net/COVIDCA?retryWrites=true&w=majority';

//app.get('/', (req, res) => res.send('Hello World!'));

app.use(cors());
app.use(bodyParser.json());

// app.use('/api', (req,res,next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//   next();
// });


mongoose.connect(dbURI,{useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log ('MongoDB database connection established successfully');
});

require ('./models/locations');
const Loc = mongoose.model('Location');

app.use('/api',apiRouter);

// app.use('/',router);
app.use(express.static(path.join(__dirname, 'frontend', 'build')));


/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
