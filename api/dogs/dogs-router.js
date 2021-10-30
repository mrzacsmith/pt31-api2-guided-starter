const router = require('express').Router()

const Dog = require('./dogs-model')

router.get('/', (req, res) => {
  Dog.find()
    .then((dogs) => {
      res.status(200).json({ dogs, count: dogs.length })
    })
    .catch((error) => {
      console.log(error.message)
    })
})

module.exports = router
