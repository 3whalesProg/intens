const ApiError = require('../error/ApiError')
const {User, Car} = require('../models/models')
const { addCarsOnDay, allCarsFromFirstToDayNow, FindBad} = require('./script')
const { exec,spawn} = require('child_process');

class LogistController{
    async checkCars(req, res, next) {
        const {carId, date} = req.body
        const candidate = await Car.findOne({where: {carId}})
        return res.json({candidate})
        const user = await User.create({email, role, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async addCarsDay(req, res, next) {
        const {month,day} = req.body
        try{
            const respone = await addCarsOnDay(month, day)
            return res.json({respone})
        }
        catch(e){
            return res.json({data: {respone: "Ошибка браузера!"}})
        }
        
        
    }
    async FindBads(req, res, next) {
      const {carId, date} = req.body
      try{
        const respone = await FindBad(carId, date)
        return res.json({respone})
      }
      catch(e){
        return res.json({data: {respone: "Ошибка браузера!"}})
      }
      
  }



}

module.exports = new LogistController()