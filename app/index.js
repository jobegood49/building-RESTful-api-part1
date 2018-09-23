// this is the primary file for the api

// dependencies

const http = require('http');

// The server should respond to all requests with a string

const server = http.createServer((req, res) => {
  res.end('Hello World \n');
});

// Start the server, and have it listen on port 3000

server.listen(3000, () => {
  console.log('the server is listening on port 3000');
});
