var express = require(`express`);
var http = require(`http`);
var users = [];

var app = express();

// sets the app up to handle http requests
var server = http.Server(app);

// sets up the socket to use our server to handle events
var io = require("socket.io")(server);

app.use(express.static("../public"));

let port = 3000;
server.listen(3000, () => {
  console.log(`server is listening on port ${port}`);
});

io.on(`connection`, socket => {
  var name = "";
  socket.on(`has connected`, username => {
    name = username;
    users.push(username);
    io.emit("has connected", { username: username, usersList: users });
  });

  socket.on(`disconnect`, () => {
    users.splice(users.indexOf(name), 1);
    // noticed the change of username reason about why?
    io.emit(`has disconnected`, { username: name, usersList: users });
  });
});
