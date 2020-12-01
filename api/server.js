const express = require('express');

const adoptersRouter = require('./adopters/adopters-router');

const server = express();

server.use(express.json());

server.use('/api/adopters', adoptersRouter); // delegate requests to /api/adopters to the router

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Shelter API</h>
    <p>Welcome to the Lambda Shelter API</p>
  `);
});

module.exports = server; // CommonJS way of exporting out of a module
// this is equivalent to: export default server; for ES2015 modules
