import {makeAutoObservable} from 'mobx';

export default class BasketStore {
    constructor() {
        this._basketId = 0;
        this._devices = [];
        this._allPrice = 0;
        makeAutoObservable(this);
    }

    setBasketId(basketId) {
        this._basketId = basketId;
    }

    setDevices(devices) {
        this._devices = devices;
    }

    setAllPrice(allPrice) {
        this._allPrice = allPrice;
    }

    get basketId() {
        return this._basketId 
    }

    get devices() {
        return this._devices;
    }

    get allPrice() {
        return this._allPrice;
    }

}