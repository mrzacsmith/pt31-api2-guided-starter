const express = require('express');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());
server.use('/api/hubs', hubsRouter); //delegate requests to /api/hubs to the router

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

module.exports = server; // CommonJS way of exporting out of a module
// this is equivalent to: export default server; for ES2015 modules
