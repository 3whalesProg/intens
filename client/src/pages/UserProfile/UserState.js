import {makeAutoObservable} from "mobx";

export default class UserState {
    constructor() {
        this._isAuth = false
        this._user = {}
        this._id = null
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setUserId(id){
        this._id = id
    }

    get UserId(){
        return this._id
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}