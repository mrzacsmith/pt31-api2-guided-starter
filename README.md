# webapi-chat-solution

Guided project for **Web API II** Module.

In this project we will learn how to create a Web API using `Node.js` and `Express`.

## Prerequisites

- [Postman](https://www.getpostman.com/downloads/) installed.

## Starter Code

The [Starter Code](https://github.com/LambdaSchool/webapi-ii-guided) for this project is configured to run the server by typing `yarn server` or `npm run server`. The server will restart automatically on changes.

Data for the API will be stored in a database and will persist across server restarts.

## Introduce REST

Load TK and walk students through a **brief** introduction to `REST`. Emphasis on it being a set of recommendations, a way of thinking about the architecture of distributed systems.

Quickly explain the 6 constraints.

Use this table to contrast RESTful endpoints from non RESTful counterparts.

| Not using REST      | Using REST                                  |
| ------------------- | ------------------------------------------- |
| `/listAllHubs`      | GET /hubs                                   |
| `/createHub`        | POST /hubs                                  |
| `/updateHub`        | PUT /hubs/:id                               |
| `/deleteHub`        | DELETE /hubs/:id                            |
| `/listHubMessages`  | GET /hubs/:id/messages                      |
| `/countHubMessages` | GET /hubs/:id/messages as an extra property |

Next we'll start breaking up the monolithic `index.js` file into separate files to achieve **separation of concerns** and make the code easier to maintain in the future.

We start by separating the creation and configuration of our server from starting to listen for requests.

## Exporting Modules the CommonJS Way

- make sure to download all dependencies with `yarn` or `npm i`.
- use `yarn server` or `npm run server` to run the API and visit `/api/hubs` to make sure it's working.
- add a new `server.js` file.
- move the server creation and configuration, including middleware and routes to that file.
- make sure to export the server at the bottom: `module.exports = server`. Explain that this is the `CommonJS` way of exporting modules.

```js
// server.js
const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`
    <h2>Lambda Hubs API</h>
    <p>Welcome to the Lambda Hubs API</p>
  `);
});

// other endpoints go here, omitted for brevity

module.exports = server;
// this is equivalent to: export default server; for ES2015 modules
```

- require `server.js` into `index.js`.

```js
// all the content left inside index.js
const server = require('./server.js'); // add this

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});
```

- test that the the API still works.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

Nex, we'll break the application into sub-application using Express Routers.

## Add Hubs Router

- inside the `hubs` folder at a new file, call it `hubs-router.js`.
- add this content to `hubs-router.js`. Note how similar it is to creating a full server.

```js
const express = require('express');

const router = express.Router();
// Take time to explain that a Router can have routes and middleware just like a full server can.

module.exports = router;
```

- move all endpoints for `/api/hubs` from `server.js` to the newly created router.
- move the `require` for the `hubs-model` from server to the router.
- refactor all instances of `server.` to read `router.` as those endpoints now belong to the router and not the server.
- remove `/api/hubs` from the URL of all the endpoints. Explain that this router only cares about what comes after `/api/hubs`. **Take your time to explain this step**.

After all the changes, `hubs-router.js` file looks like this:

```js
const express = require('express');

const Hubs = require('./hubs-model.js'); // dont' forget to update the path to file

const router = express.Router();

// handles GET /api/hubs/
router.get('/', async (req, res) => {
  // same implementation as before omitted to save space
});

// handles GET /api/hubs/:id
router.get('/:id', async (req, res) => {
  // same implementation as before omitted to save space
});

// handles POST /api/hubs/
router.post('/', async (req, res) => {
  // same implementation as before omitted to save space
});

router.delete('/:id', async (req, res) => {
  // same implementation as before omitted to save space
});

router.put('/:id', async (req, res) => {
  // same implementation as before omitted to save space
});

module.exports = router;
```

- the last step is to go back to `server.js` and `use` the router for all routes that begin with `/api/hubs`.

```js
const hubsRouter = require('./hubs/hubs-router.js'); // add this line after requiring express

server.use(express.json());
server.use('/api/hubs', hubsRouter); // add this line to use the router
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

## Reading Query String Parameters

We have covered how to receive data from the client using the request `body` and `url parameters`. Now we'll explore another way to accept data from the client.

1. Create a file markdown file (notes.md is what I use) for the next step.
1. Do a quick search in google for `query string parameters`.
1. Copy the URL from the browser and paste it in your markdown file. It looked like this for me:

```md
https://www.google.com/search?newwindow=1&source=hp&ei=Z1drXP_JBYS0ggepyrmIAQ&q=query+string+parameters&btnK=Google+Search&oq=query+string+parameters&gs_l=psy-ab.3..0l10.1617.6689..6917...2.0..0.122.2798.2j25......0....1..gws-wiz.....0..0i131j0i10._0l3Msv44yw
```

4. Use the URL to introduce the concept of `query string parameters`.
5. break it up showing how query string parameters work:

```txt
https://www.google.com/search
?           <--marks the beginning of the query string
newwindow=1 <-- a key value/pair
&           <-- separator for the next key/value pair
source=hp   <-- rinse and repeat
&
ei=Z1drXP_JBYS0ggepyrmIAQ
delete the rest
```

Explain that `Express` will take the query string, parse it and save it as an object in the request under `req.query`. In that example the resulting `req.query` would look like this:

```js
req.query = {
  newwindow: '1',
  source: 'hp',
  ei: 'Z1drXP_JBYS0ggepyrmIAQ',
};
```

Let's see this in action. Notice this endpoint:

```js
router.get('/', async (req, res) => {
  try {
    // we are passing req.query to the .find() method of hubs-model
    const hubs = await Hubs.find(req.query);
    res.status(200).json(hubs);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hubs',
    });
  }
});
```

Now let's look at the `.find()` method of `hubs-model.js`. It is set to read `page`, `limit`, `sortby` and `sortdir` from the query string and use it to do pagination and sorting of the records at the database level.

```js
function find(query) {
  const { page = 1, limit = 2, sortby = 'id', sortdir = 'asc' } = query;
  const offset = limit * (page - 1);

  let rows = db('hubs')
    .orderBy(sortby, sortdir)
    .limit(limit)
    .offset(offset);

  return rows;
}
```

Students will learn about how that works in the database week, for now we'll cover how to send parameters throw the query string.

- Use `Postman` to make a request to `/api/hubs`, notice we only see 2 records.
- change the url to include the `limit` query string parameter: `/api/hubs?limit=5`. This makes the page size be 5 records.
- change the url to include the `page` query string parameter: `/api/hubs?limit=5&page=2`. Now the next 5 records are shown.
- change the url to include the `sortby` and `sortdir` query string parameters: `/api/hubs?limit=5&page=2&sortby=name&sortdir=desc`.

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

Next, let's see how to handles sub-resources by building an endpoint to view all `messages` for a `hub`.

## Use sub-routes

When a resource only makes sense within the context of another resource, in REST we create a sub-route. For our use case, the `message` resource lives within the `hub` resource.

Here's the code:

```js
router.get('/:id/messages', async (req, res) => {
  try {
    const messages = await Hubs.findHubMessages(req.params.id);

    if (messages.length > 0) {
      res.status(200).json(messages);
    } else {
      res.status(404).json({ message: 'No messages for this hub' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the messages for this hub',
    });
  }
});
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**

### You Do (estimated 5m to complete)

Ask student to write and endpoint to new message to a hub.

A possible solution using sub-routes:

```js
router.post('/:id/messages', async (req, res) => {
  const messageInfo = { ...req.body, hub_id: req.params.id };
  try {
    const message = await Hubs.addMessage(messageInfo);
    res.status(201).json(message);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the message',
    });
  }
});
```

## Gotcha, show if time permits

Sometimes the following error displays in the console `Cannot set header after they are sent to the client`.

This code suffers from that:

```js
router.get('/:id', async (req, res) => {
  try {
    const hub = await Hubs.findById(req.params.id);

    if (hub) {
      res.status(200).json(hub); // forget to add return at the beginning of this line
    }
    // this code tries to modify the response a second time, this is the reason for the error
    res.status(404).json({ message: 'Hub not found' });
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the hub',
    });
  }
});
```

- fix it by wrapping the `404` in an `else` or changing the success line to `return res.status(200).json(hub);`

```js
if (hub) {
  res.status(200).json(hub);
} else {
  res.status(404).json({ message: 'Hub not found' });
}
```

**wait for students to catch up, use a `yes/no` poll to let students tell you when they are done**
