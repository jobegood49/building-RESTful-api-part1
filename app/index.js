// this is the primary file for the api

// dependencies

const http = require('http');
const https = require('https')
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');
const fs = require('fs')

// The server should respond to all requests with a string

const httpserver = http.createServer((req, res) => {
  unifiedServer(req,res)
});

const httpsServerOptions = {
  key: fs.readFileSync('./https/key.pem'),
  cert: fs.readFileSync('./https/cert.pem')
}

const httpsserver = https.createServer(httpsServerOptions,(req, res) => {
  unifiedServer(req,res)
});

// Start the server, and have it listen on port 3000

httpserver.listen(config.httpPort, () => {
  console.log(
    'the server is listening on port ' +
      config.httpPort
  );
});

httpsserver.listen(config.httpsPort, () => {
  console.log(
    'the server is listening on port ' +
      config.httpsPort
  );
});

let unifiedServer = (req, res) => {
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

    //Choose the handler this request should go to
    let chosenHandler =
      typeof router[trimmedPath] !== 'undefined'
        ? router[trimmedPath]
        : handlers.notFound;

    //Construct the data object to send to the handler

    let data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: buffer,
    };
    //Route the request to the handler specified in the router
    chosenHandler(data, (statusCode, payload) => {
      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof statusCode == 'number' ? statusCode : 200;

      // Use the payload returned from the handler, or set the default payload to an empty object
      payload = typeof payload == 'object' ? payload : {};

      // Convert the payload to a string
      var payloadString = JSON.stringify(payload);

      res.setHeader('Content-type', 'application/json');

      // Return the response
      res.writeHead(statusCode);
      res.end(payloadString);
      console.log(
        'Returning this response: ',
        statusCode,
        payloadString,
        payload
      );
    });
  });
};
//define the handlers
let handlers = {};

//Sample handler
handlers.sample = (data, cb) => {
  cb(406, { name: 'sample handler' });
};

//Not found handler
handlers.notFound = (data, cb) => {
  cb(404);
};

//Define he the request router
const router = {
  sample: handlers.sample,
};
