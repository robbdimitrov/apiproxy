const express = require('express');
var http = require("http");

const app = express();

const serverHost = 'localhost:8001';

const port = process.env.PORT;
const accessToken = process.env.ACCESS_TOKEN;

app.all('*', (req, res) => {
  // 1. Add Authorization header
  // 2. Send to server
  // 3. Proxy response
  const options = {
    host: serverHost.split(':')[0],
    port: serverHost.split(':')[1] || 80,
    path: req.path,
    method: req.method,
    headers: {
      ...req.headers,
      authorization: `Bearer ${accessToken}`
    }
  };
  req.pipe(http.request(options, (response) => response.pipe(res)));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
