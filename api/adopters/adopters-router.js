const router = require('express').Router()

const Adopters = require('./adopters-model')

router.get('/', async (req, res) => {
  try {
    const adopters = await Adopters.find(req.query)

    res.status(200).json(adopters)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// this should be tested as built, not all at once
router.get('/:id', async (req, res) => {
  // Adopters.findById(req.params.id)
  //   .then((adopter) => {
  //     if (!adopter) return res.status(404).json({ message: 'not found' })
  //     res.status(200).json(adopter)
  //   })
  //   .catch((error) => res.status(500).json({ message: error.message }))

  try {
    const adopter = await Adopters.findById(req.params.id)
    if (!adopter) return res.status(404).json({ message: 'not found' })
    res.status(200).json({ adopter, count: adopter.length })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id/dogs', (req, res) => {
  Adopters.findDogs(req.params.id)
    .then((dogs) => {
      if (dogs.length > 0) {
        res.status(200).json(dogs)
      } else {
        res.status(404).json({ message: 'No dogs for this adopter' })
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: 'Error retrieving the dogs for this adopter',
      })
    })
})

router.post('/', async (req, res) => {
  try {
    const addAdopter = await Adopters.add(req.body)
    res.status(201).json(addAdopter)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const changes = req.body
    const updated = await Adopters.update(req.params.id, changes)
    res.status(200).json(updated)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  // Adopters.findById(req.params.id)
  //   .then((adopter) => {
  //     if (!adopter) return res.status(404).json({ message: 'not found' })
  //     res.status(200).json(adopter)
  //   })
  //   .catch((error) => res.status(500).json({ message: error.message }))

  try {
    const destroyAdopter = await Adopters.remove(req.params.id)
    if (!destroyAdopter) return res.status(404).json({ message: 'not found' })
    res.status(200).json({ message: 'destroyed' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router
