const http = require('http');

const port = process.env.PORT;
const accessToken = process.env.ACCESS_TOKEN;

http.createServer((request, response) => {
  let body = [];
  request.on('error', (err) => {
    console.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    const requestBody = Buffer.concat(body).toString();

    console.log('request ended ' + JSON.stringify(request));

    response.on('error', (err) => {
      console.error(err);
    });

    if (request.path === '/hello') {
      const responseBody = {message: 'Hello World'};
      response.statusCode = 200;
      response.setHeader('Content-Type', 'application/json');
      response.end(JSON.stringify(responseBody));
    } else if (request.path === '/auth' && request.method === 'POST') {
      const token = request
        .getHeader('authorization')
        .replace('Bearer ', '');

      if (token === accessToken) {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'application/json');
        response.end(requestBody);
      } else {
        response.statusCode = 401;
        response.end('Unauthorized');
      }
    } else {
      response.statusCode = 404;
      response.end('Not Found');
    }
  });
}).listen(port);

console.log(`Starting server on port ${port}`);
