const { default: puppeteer } = require("puppeteer")
let dayDate = new Date().getDay().toString()
const {Car} = require('../models/models')

addCarsOnDay = async(month, day) => {
    const USER_NAME = 'machines'
    const PASSWORD =  'mach'
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto("http://185.7.85.13:8081/disp")
    await page.click('input[name="userName"]');
    await page.keyboard.type('machines');
    await page.click('input[name="password"]');
    await page.keyboard.type('mach');
    await page.click('input[type="submit"]');
    await page.goto("http://185.7.85.13:8081/disp") 
    try{
        for (i = parseInt(day); i <= parseInt(day); i++){
            await page.goto("http://185.7.85.13:8081/disp?curDate=2023-" + month + '-' + day)
            let arr = await page.evaluate(() => {
                let text = Array.from(document.querySelectorAll('input[name="carsTree"]'), el => el.id)
                return text
            })
            const cars = arr.slice(3)
            for (carId of cars){            
                await page.click(`input[id="${carId}"]`);
                await new Promise(r => setTimeout(r, 1000));
                let html = await page.evaluate(async() => {
                    const arr = []
                    len = document.getElementById("tExportObjects").querySelectorAll('tr > td > p').length
                    let sum = 6
                    for (i = 0; i < len; i++){
                        if (sum == 0){
                            sum = 11
                            arr.push(document.getElementById("tExportObjects").querySelectorAll('tr > td > p')[i].innerHTML)
                        }
                        else{sum -= 1}
                    }
                    return arr
                })
                console.log(html)
                const candidate = await Car.findOne({where: {carId}})
                if (candidate){
                        if (candidate['dataValues']['arr'][month]){
                            const all = candidate['dataValues']['arr']
                            all[month][i] = html
                            const car = await Car.update({arr: all}, {where: {carId}})
                            console.log("месяц")
                        }
                        else{
                            const all = candidate['dataValues']['arr']
                            all[month] = {}
                            all[month][i] = html
                            const car = await Car.update({arr: all}, {where: {carId}})
                            console.log("месяц")
                        }
                    }   
                else{
                    const car = await Car.create({carId, arr: {[month]: {[i]: html}}})
                    console.log("Создание")
                }
    
                }
            }
        browser.close()
        return "Успех"
    }
    catch(e){
        browser.close()
        return "Ошибка!"
    }
     
    }


    
FindBad = async(carId, date) => {
            const newArr = {}
        const USER_NAME = 'machines'
        const PASSWORD =  'mach'
        const browser = await puppeteer.launch({headless: false})
        const page = await browser.newPage()
        await page.goto("http://185.7.85.13:8081/disp")
        await page.click('input[name="userName"]');
        await page.keyboard.type('machines');
        await page.click('input[name="password"]');
        await page.keyboard.type('mach');
        await page.click('input[type="submit"]');
        await page.goto("http://185.7.85.13:8081/disp")
        const f_date = 1
        var s_date = 32 - new Date(2023, date-1, 32).getDate()
        try{
        for (i = f_date; i <= s_date; i++){
            await page.goto("http://185.7.85.13:8081/disp?curDate=2023-" + date.toString() + '-' + i.toString())            
            await page.click(`input[id="${carId}"]`);
            await new Promise(r => setTimeout(r, 1200));
            let html = await page.evaluate(async() => {
                const arr = []
                len = document.getElementById("tExportObjects").querySelectorAll('tr > td > p').length
                let sum = 6
                for (i = 0; i < len; i++){
                    if (sum == 0){
                        sum = 11
                        arr.push(document.getElementById("tExportObjects").querySelectorAll('tr > td > p')[i].innerHTML)
                        }
                        else{sum -= 1}
                    }
                    return arr
                })
                newArr[i] = html
            }
            const candidate = await Car.findOne({where: {carId}})
            const old = candidate['dataValues']['arr'][date]
            const all = candidate['dataValues']['arr']
            Object.keys(old).map((key) => {old[key].map((item,index) => {
                if (item != newArr[key][index]){
                    console.log(newArr[key][index])
                    all[date][key][index] = `${item} -> ${newArr[key][index]}`
                }
            })} )
            await Car.update({arr: all}, {where: {carId}})
            return "Успех!"
        }
        catch(e){return "Ошибка"}
    }


module.exports = {
    addCarsOnDay, 
    FindBad
}

