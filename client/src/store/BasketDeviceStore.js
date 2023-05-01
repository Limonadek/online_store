import {makeAutoObservable} from 'mobx';

export default class BasketDeviceStore {
    constructor() {
        this._device = {};
        makeAutoObservable(this);
    }

    setDevice(device) {
        this._device = device;
    }
    
    get device() {
        return this._device;
    }

}
