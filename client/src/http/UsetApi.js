import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, role, phone, firstname, secondname) => {
    const {data} = await $host.post('api/user/registration', {email, password, role, phone, firstname, secondname})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const adminReg = async (email, password, role, phone, firstname, secondname) => {
    const {data} = await $host.post('api/user/adminReg', {email, password, role, phone, firstname, secondname})
    return {data}
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const info = async () => {
    const {data} = await $authHost.post('/api/user/info')
    return{data}
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth' )
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}
export const trashinfo = async (carId, date) => {
    const {data} = await $authHost.post('api/logist/carsinfo', {carId, date})
    return {data}
}
export const getUsers = async(role) => {
    const {data} = await $authHost.get('api/user/getUsers?role=' + role)
    return {data}
}


export const getConstructions = async() => {
    const {data} = await $authHost.get('api/user/constructions')
    return {data}
}
export const newItem = async(title, quantity, app_id) => {
    const {data} = await $authHost.post('api/user/newItem', {title, quantity, app_id})
    return {data}
}
export const delItem = async(id) => {
    const {data} = await $authHost.post('api/user/delItem', {id})
    return {data}
}
export const newItemStatus = async(id, status) => {
    const {data} = await $authHost.post('api/user/newItemStatus', {id, status})
    return {data}
}


export const getApplications = async(id) => {
    const{data} = await $authHost.get('api/user/getApplications?construction_id=' + id)
    return{data}
}

export const getProfile = async(id) => {
    const {data} = await $authHost.get('api/user/getProfile?id=' + id)
    return {data}
}
export const createAvatar = async(avatar) => {
    const {data} = await $authHost.post('api/user/createAvatar', avatar)
    return {data}
}

export const addCarsDay = async (month, day) => {
    const {data} = await $authHost.post('api/logist/carsadd', {month, day})
    return {data}
}
export const newChat = async (firstId, secondId) => {
    const {data} = await $authHost.post('api/user/newChat', {firstId, secondId})
    return {data}
}
export const getChats = async(id)=>{
    const {data} = await $authHost.post('api/user/getChats', {id})
    return {data}
}
export const sendMsg = async(chatId, text, senderId)=>{
    const {data} = await $authHost.post('api/user/sendMsg', {chatId, text, senderId})
    return {data}
}
export const getMsg = async(chatId)=>{
    const {data} = await $authHost.post('api/user/getMsg', {chatId})
    return {data}
}
export const FindBad = async (carId, date) => {
    const {data} = await $authHost.post('api/logist/findbad', {carId, date})
    return {data}
}
