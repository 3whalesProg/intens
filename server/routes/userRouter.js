const Router = require('express')
const router = new Router()
const userController = require('../controllers/UserController')
const authMiddleWare = require('../middleware/authMiddleWare')

router.post('/registration', userController.registration)
router.post('/adminReg', userController.adminReg)
router.post('/login', userController.login)
router.post('/createAvatar', userController.createAvatar)
router.post('/newChat', userController.newChat)
router.post('/sendMsg', userController.sendMsg)
router.post('/getMsg', userController.getMsg)
router.post('/newItem', userController.makeNewItem)
router.post('/delItem', userController.delItem)
router.post('/newItemStatus', userController.newItemStatus)
router.get('/getUsers', userController.getUsers)
router.get('/getApplications', userController.getApplications)
router.get('/getProfile', userController.getProfile)
router.get('/constructions', userController.getConstructions)
router.post('/getChats', userController.getChats)
router.get('/auth', authMiddleWare, userController.check)



module.exports = router