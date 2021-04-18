const http = require('http');

const port = process.env.PORT;
const accessToken = process.env.ACCESS_TOKEN;
const serverAddr = process.env.SERVER_ADDR;

http.createServer((request, response) => {
  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });

  // 1. Add Authorization header
  // 2. Send to server
  // 3. Proxy response
  const options = {
    host: serverAddr.split(':')[0],
    port: serverAddr.split(':')[1] || 80,
    path: request.path,
    method: request.method,
    headers: {
      ...request.headers,
      authorization: `Bearer ${accessToken}`,
    }
  };
  request.pipe(http.request(options, (res) => {
    res.pipe(response);
  }));
}).listen(port);

console.log(`Starting server on port ${port}`);
