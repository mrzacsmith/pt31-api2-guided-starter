# webapi-chat-solution

## **Work in Progress**

Guided project for **Web API II** Module.

Starter code is here: [Web API Chat Guided Project](https://github.com/LambdaSchool/webapi-chat).

In this project we will learn how to create a Web API using `Node.js` and `Express`.

## Prerequisites

- [Postman](https://www.getpostman.com/downloads/) installed.

## Starter Code

The [Starter Code](https://github.com/LambdaSchool/webapi-chat) for this project is configured to run the server by typing `yarn server` or `npm run server`. The server will restart automatically on changes.

Data for the API will be stored in memory using a database.

## Exporting Modules the CommonJS Way

- add `server.js` and move the server creation and configuration, including middleware and routes to that file.
- make sure to export the server at the bottom: `module.exports = server`.

```js
// server.js
const express = require('express');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

// other endpoints go here, ommitted for brevity

module.exports = server;
// this is equivalent to: export default server; for ES2015 modules
```

- require `server.js` into `index.js`.

## Add Hubs Router

- added hubs router
- moved require db to hubs router

- you do: add an api router to handle all requests that start with `/api` and require the hubs router there. Only the api router should be required in `server.js`

## Reading Query String Parameters

- you do: add sorting.
- pagination using query string (default to last 10 messages).

## Sub-Routes or Sub-Applications

- a message has: id, hubId, senderName and text.
- add subroutes for messages.
- after this code show the `Cannot set header afte they are sent to the client` message
- you do: add post to messages
- you do: find

```js
router.get('/:id', async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub) {
      res.status(200).json(hub);
    }

    res.status(404).json({ message: 'Hub not found' });
  } catch (error) {
    // log error to database1
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});
```

- fix it by wrapping the 404 in an else

```js
if (hub) {
  res.status(200).json(hub);
} else {
  res.status(404).json({ message: 'Hub not found' });
}
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**
