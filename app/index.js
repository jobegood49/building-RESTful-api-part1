// this is the primary file for the api

// dependencies

const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

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

  // Get the headers as an object
  let headers = req.headers;

  //Get the payload, if any
  let decoder = new StringDecoder('utf-8');
  let buffer = '';
  req.on('data', data => {
    buffer += decoder.write(data);
  });
  req.on('end', () => {
    buffer += decoder.end();

    //Send the response
    res.end('Hello World\n');

    // Log the request path
    console.log('Request received with this payload ', buffer, headers);
  });
});

// Start the server, and have it listen on port 3000

server.listen(3000, () => {
  console.log('the server is listening on port 3000');
});
