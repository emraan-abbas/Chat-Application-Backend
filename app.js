const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

const mongoose = require ('mongoose');
const bodyParser = require('body-parser')
const cors = require('cors');
const routes = require('./Routes/index');
const messageController = require('./Controllers/message.controller')

const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

// CORS
app.use(cors());

// DB Connection
mongoose.connect('mongodb://127.0.0.1:27017/ChatApplication', {
  useNewUrlParser: true,
	useUnifiedTopology: true,
})
.then(() => {
  console.log("Database Connected !")
})
.catch((err) => {
  console.log("Error at DB Connection", err);
  process.exit();
});


// All Routes
app.use('/', routes);


// Socket Works Here
io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (data) => {
    messageController.postMessage(data.message, data.senderId)
    // io.emit('message', ` ${data.message}`);
    io.emit('message', {name: data.name, message: data.message}); // Upper line is replce in place of this
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});

httpServer.listen(port, () => console.log(`listening on port ${port}`));
