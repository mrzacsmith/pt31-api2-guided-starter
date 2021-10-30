// create basic index
const server = require('./api/server')
require('colors')

const PORT = 4040
server.listen(PORT, () =>
  console.log(`\n** server is listening on port ${PORT}`.cyan)
)
