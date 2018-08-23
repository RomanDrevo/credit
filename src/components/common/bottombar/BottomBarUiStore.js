import {action, observable} from 'mobx';

export default class BottomBarUiStore {

    constructor(apiGateway) {
        this._apiGateway = apiGateway
    }
    @observable currentPosition = {};

    @action.bound
    getLocationInfo() {
        navigator.geolocation.getCurrentPosition(this.geoSuccess)
    }

    @action.bound
    geoSuccess(position) {
        console.log(position);
        this.currentPosition = position
    }


}
