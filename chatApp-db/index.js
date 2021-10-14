const express = require('express');
const app = express();
const dateTime = require("simple-datetime-formater");
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatroute");
const loginRouter = require("./route/loginRoute"); 
const http = require('http');
const path = require('path');
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const exphbs = require('express-handlebars');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
mongoose.Promise = global.Promise;
		mongoose.connect('mongodb://mydb1:mydb1@localhost:27017/mydb1')
		.then(()=>console.log("Connection Open"))
		.catch(()=>console.log("Error"))

//     // view engine setup
  app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({
   defaultLayout: false,
 
 }));

 app.set('view engine', 'handlebars');
// //routes
app.use("/chats", chatRouter);
//database connection
const Chat = require("./models/Chat");
const connect = require("./dbconnect");


app.get('/', (req, res) => {
  Chat.find(function (err, data) {
    if (err) {
      console.log("error in fetch data");
    }
    else {
      console.log("data fetch sucessfully");
      console.log(data);
      // res.sendFile(__dirname + '/index.handlebars', { connect_array: data });
      res.render('index',{ connect_array: data });
    }
  }).lean()

  })
  io.on('connection', (socket) => {
    console.log('a user connected');
  });
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
 io.on('connection', (socket) => {
     //Someone is typing
  socket.on("typing", data => {
    socket.broadcast.emit("notifyTyping", {
      user: data.user,
      message: data.message
    });
  });

   
  });

  // io.on('connection', (socket) => {
  //   socket.on('chat message', (msg) => {
  //     console.log('message: ' + msg);
  //   });
  // });
    // This will emit the event to all connected sockets
  io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 
  io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
  }); 
  // io.on('connection', (socket) => {
  //   socket.on('chat message', (data) => {
  //     io.emit('chat message', data);})
  // }); 

  io.on('connection', (socket) => {
    
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    
        //save chat to the database
    connect.then(db => {
      console.log("connected correctly to the server");
      let chatMessage = new Chat({ message: msg, sender: "Priyanka" });

      chatMessage.save();
    });
    });
  });
server.listen(3000, () => {
  console.log('listening on *:3000');
});