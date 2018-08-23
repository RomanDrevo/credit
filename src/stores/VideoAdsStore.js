import { action, observable } from 'mobx';

export default class VideoAdsStore {
    @observable videoAds = [];

    constructor(apiGateway) {
        this._apiGateway = apiGateway;
    }

    @action
    async loadVideoAds() {
        this.videoAds = [{youtubeId:'WLsw6HZxHUg'}];
    }
}
