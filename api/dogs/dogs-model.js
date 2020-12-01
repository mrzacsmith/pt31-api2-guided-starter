const knex = require('knex');
const config = require('../../knexfile.js');
const db = knex(config.development);

module.exports = {
  find,
};

function find() {
  return db('dogs as d')
    .leftJoin('adopters as a', 'a.id', 'd.adopter_id')
    .select('d.id', 'd.name', 'd.weight', 'a.name as adopter_name');
}
