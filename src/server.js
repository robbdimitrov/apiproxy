const express = require('express');

const app = express();

const port = process.env.PORT;
const accessToken = process.env.ACCESS_TOKEN;

app.use(express.json());

app.use((req, res, next) => {
  if ('authorization' in req.headers) {
    let authorization = req.header('authorization').replace('Bearer ', '');
    if (authorization === accessToken) {
      return next();
    }
  }
  res.status(401).send('Unauthorized');
});

app.get('/hello', (req, res) => {
  res.send({type: 'HELLO', status: 'SUCCESSFUL'});
});

app.post('/auth', (req, res) => {
  console.log(`BODY = ${JSON.stringify(req.body)}`);
  res.send({type: 'AUTH', status: 'SUCCESSFUL'});
});

app.post('/user/:name', (req, res) => {
  console.log(`For user ${req.params.name} BODY = ${JSON.stringify(req.body)}`);
  res.send({type: 'AUTH', status: 'SUCCESSFUL'});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
