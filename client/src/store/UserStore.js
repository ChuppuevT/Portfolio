import { makeAutoObservable } from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._isAdmin = false
        this._user = {}
        this._id = -1
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }

    setId(id) {
        this._id = id
    }

    setIsAdmin(bool) {
        this._isAdmin = bool
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get id() {
        return this._id
    }

    get isAdmin() {
        return this._isAdmin
    }
}
