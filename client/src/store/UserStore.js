import {makeAutoObservable} from 'mobx';
// mobx будет следить за изменениями этих переменных

export default class UserStore {
    constructor() {
        this._isAuth = false; // нижнее подчеркивание говорит о том, что перемення изменяться не может
        this._user = {};
        makeAutoObservable(this);
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    setUser(user) {
        this._user = user;
    }

    get isAuth() {
        return this._isAuth;
    }

    get user() {
        return this._user;
    }
}