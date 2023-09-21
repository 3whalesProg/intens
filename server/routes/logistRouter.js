const Router = require('express')
const router = new Router()
const LogistController = require('../controllers/LogistController')

router.post('/carsinfo', LogistController.checkCars)
router.post('/carsadd', LogistController.addCarsDay)
router.post('/findbad', LogistController.FindBads)


module.exports = router