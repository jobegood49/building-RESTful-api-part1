// this is the primary file for the api

// dependencies

const http = require('http');
const url = require('url');

// The server should respond to all requests with a string

const server = http.createServer((req, res) => {
  // Get the URL and parse it

  let parsedUrl = url.parse(req.url, true);

  // Get the path
  let path = parsedUrl.pathname;
  let trimmedPath = path.replace(/^\/+|\/+$/g, '');

  // Get the query string as an object
  var queryStringObject = parsedUrl.query;

  // Get the HTTP method
  let method = req.method.toLowerCase();

  //Send the response
  res.end('Hello World\n');

  // Log the request path
  console.log(
    'Request received on path: ' +
      trimmedPath +
      ' the method is: ' +
      method +
      ' and with these query string parameters: ',
      queryStringObject
  );
});

// Start the server, and have it listen on port 3000

server.listen(3000, () => {
  console.log('the server is listening on port 3000');
});
