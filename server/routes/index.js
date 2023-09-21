const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const logistRouter = require('./logistRouter')

router.use('/user', userRouter)
router.use('/logist', logistRouter)

module.exports = router