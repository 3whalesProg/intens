const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, User_info, User_profile, Chat, Message, Unwatched_reg, Construction, Application, Application_item} = require('../models/models')
const uuid = require('uuid')
const path = require('path')
const { where } = require('sequelize')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        'secret',
        {expiresIn: '24h'}
    )
}

class UserController{
    async registration(req, res, next) {
        try{
        const {email, password, role, phone, firstname, secondname} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email'))
        }
        const candidate = await User.findOne({where: {email}})
        const candidatereg = await Unwatched_reg.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь или заявка на регистрацию с таким email уже существует'))
        }
        if (candidatereg){
            return next(ApiError.badRequest("1"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await Unwatched_reg.create({email:email, password: hashPassword, role: role, phone: phone, firstname: firstname, secondname: secondname})
        // const hashPassword = await bcrypt.hash(password, 5)
        // const user = await User.create({email, role, password: hashPassword})
        // .then(user => {
        //     return User_info.create({
        //         id: user.id,
        //         firstName: firstName,
        //         secondName: secondName,
        //         phone: phone,
        //     }
        //     )
        // })
        // const token =  generateJwt(user.id, user.email, user.role)
        return res.json({user})}
        catch(e){
            console.log(e)
        }
        
    }
    async adminReg(req, res, next) {
        try{
        const {email, password, role, phone, firstname, secondname} = req.body
        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный email'))
        }
        const candidate = await User.findOne({where: {email}})
        const candidatereg = await Unwatched_reg.findOne({where: {email}})
        if (candidate) {
            return next(ApiError.badRequest('Пользователь или заявка на регистрацию с таким email уже существует'))
        }
        if (candidatereg){
            return next(ApiError.badRequest("1"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email: email, role: role, password: hashPassword})
        .then(user => {
            return User_info.create({
                firstName: firstname,
                secondName: secondname,
                phone: phone,
                userId: user.id,
            }
            )
        })
        
        return res.json({user})}
        catch(e){
            console.log(e)
        }
        
    }
    async login(req, res, next) {
        try{
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    catch(e){
        console.log(e)
    }
    }
    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async getUsers(req,res,next){
        const {role} = req.query
        if (role){
            const workers = await User.findAll({where: {role}, include: User_info})
            const workersInfo = workers.map(el => {const data = {} 
                data['id'] = el['id']
                data['firstName'] = el ['user_info']['firstName']
                data['secondName'] = el ['user_info']['secondName']
                data['role'] = el ['role']
                return data})
                return res.json({workersInfo})
        }
        else{
            const workers = await User.findAll({include: User_info})  
            const workersInfo = workers.map(el => {const data = {} 
            data['id'] = el['id']
            data['firstName'] = el ['user_info']['firstName']
            data['secondName'] = el ['user_info']['secondName']
            data['role'] = el ['role']
            return data})
            return res.json({workersInfo})
        }
    }
    async getProfile(req,res,next){
        try{

        
        const {id} = req.query
        const user = await User.findOne({where: {id}, include: User_info})
        const userInfo = {}
        userInfo['firstName'] = user['user_info']['firstName']
        userInfo['secondName'] = user['user_info']['secondName']
        userInfo['role'] = user['role']
        userInfo['email'] = user['email']
        userInfo['phone'] = user['user_info']['phone']
        return res.json({userInfo})}
        catch(e){
            console.log("Не получилось получить профиль!")
        }
    }

    async getConstructions(req,res){
        try{
        const active = true
        const Constructions = await Construction.findAll({include: {model: Application, where: {}}})
        let sortedConst = []
        Constructions.map(item => {
            sortedConst.push(
                {
                    "id": item['dataValues']['id'],
                    "title": item['dataValues']['address'],
                    "lastItem": item['dataValues']['last_item'],
                    "foremanName": item['dataValues']['foreman_name'],
                    "date": item['dataValues']['updatedAt']
                })
        })
        console.log({sortedConst})
        return res.json({sortedConst})
    }
    catch(e){
        console.log('Не получилось получить объект')
    }

    }

    async getApplications(req,res){
        const {construction_id} = req.query
        const App = await Application.findAll({where: {construction_id, active: true},include: [{model: Application_item}]})
        const id = construction_id
        const con = await Construction.findOne({where: {id}}) 
        console.log(con['dataValues']['address'])
        const sortedApp = App.map(el => {
            const data = {} 
            data['title'] = con['dataValues']['address']
            data['appId'] = el['dataValues']['id']
            data['dateApp'] = el['dataValues']['createdAt']
            data['items'] = el['application_items'] 
            return data
    }
        )
            return res.json({sortedApp})
    }
        
    

    async createAvatar(req,res,next){
        const {id} = req.body
        console.log(id)
        const {img} = req.files
        let fileName = uuid.v4() + ".jpg"
        img.mv(path.resolve(__dirname, '..', 'static', fileName))
        const avatar = await User_profile.update({avatar: fileName}, {where: {id}})
        return res.json(avatar)
    }
    async newChat(req,res){
        const {firstId, secondId} = req.body
        const chat = await Chat.create({text: 'Hello, World!'})
        let id = firstId
        const user = await User.findOne({where: {id}})
        id = secondId
        const user2 = await User.findOne({where: {id}})
        console.log(user)
        await user.addChat(chat)
        await user2.addChat(chat)
        const result = await User.findOne({
            where: {id},
            include: Chat
          });
        return res.json(result)
    }
    async getChats(req,res){
        const {id} = req.body
        const chats = await User.findByPk(id, {include: Chat})
        return res.json(chats['chats'])
    }
    async sendMsg(req,res){
        const {chatId, text, senderId} = req.body
        const chat = await Chat.findOne({where: {chatId}})
        const message = await Message.create({chatId: chatId, text: text, senderId: senderId, chatChatId: chatId})
        chat.addMessage(message)
        return res.json(message)
    }
    async getMsg(req,res){
        const {chatId} =req.body
        const chat = await Chat.findByPk(chatId, {include: Message})
        return res.json(chat['messages'])
        }
    async makeNewItem(req,res){
        try{
        const {app_id, title, quantity} = req.body
        const application_item = await Application_item.create({title: title, quantity: quantity, app_id:app_id})
        const id = app_id
        const application = await Application.update({last_item: title}, {where: {id}})
        console.log(application)
        return res.json(application_item)}
        catch(e){
            console.log(e)
        }
    }
    async delItem(req,res){
        try{
        const {id} = req.body
        const application_item = await Application_item.update({active: false}, {where: {id}})
        return res.json(application_item)}
        catch(e){
            console.log(e)
        }
    }

    async newItemStatus(req,res){
        try{
        const {id, status} = req.body
        console.log(id, status)
        const application_item = await Application_item.update({status: status}, {where: {id}})
        return res.json(application_item)}
        catch(e){
            console.log(e)
        }
    }
    
}



module.exports = new UserController()