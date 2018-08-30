var express = require(`express`);
var http = require(`http`);

var app = express();

// sets the app up to handle http requests
var server = http.Server(app);

// sets up the socket to use our server to handle events
var io = require("socket.io")(server);

let port = 3000;
server.listen(3000, () => {
  console.log(`server is listening on port ${port}`);
});

app.get(`/`, (req, res) => {
  res.sendFile(__dirname + `/index.html`);
});

io.on(`connection`, socket => {
  console.log(`A user has connected...YAYYYYYY!!!!!`);

  socket.on(`disconnect`, () => {
    console.log(`A user has disconnected...SADZ :(`);
  });
});