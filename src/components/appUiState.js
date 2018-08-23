import {observable, runInAction} from 'mobx';
import matchMedia from 'matchmediaquery'

const QUERIES = {
    'mobile': 'only screen and (max-width : 767px)',
    'tablet': 'only screen and (min-width : 768px) and (max-width: 992px)',
    'dekstop': 'only screen and (min-width : 993px)',
};


export const DeviceType = {
    MOBILE: "MOBILE",
    TABLET: "TABLET",
    DESKTOP: "DESKTOP"
};

class AppUiState {
    @observable deviceType = DeviceType.DESKTOP;

    constructor() {
        this._subscribeToMqlChanges()
    }

    _subscribeToMqlChanges() {
        this._mobileMql = matchMedia(QUERIES.mobile);
        this._mobileMql.addListener(e => runInAction(() => this._onMobileQueryChanged(e.matches)));
        this._onMobileQueryChanged(this._mobileMql.matches);

        this._tabletMql = matchMedia(QUERIES.tablet);
        this._tabletMql.addListener(e => runInAction(() => this._onTabletQueryChanged(e.matches)));
        this._onTabletQueryChanged(this._tabletMql.matches);

        this._desktopMql = matchMedia(QUERIES.dekstop);
        this._desktopMql.addListener(e => runInAction(() => this._onDesktopQueryChanged(e.matches)));
        this._onDesktopQueryChanged(this._desktopMql.matches);
    }

    _onDesktopQueryChanged(matches) {
        if (matches) {
            this.deviceType = DeviceType.DESKTOP;
        }
    }

    _onTabletQueryChanged(matches) {
        if (matches) {
            this.deviceType = DeviceType.TABLET;
        }
    }

    _onMobileQueryChanged(matches) {
        if (matches) {
            this.deviceType = DeviceType.MOBILE;
        }
    }
}

export default new AppUiState();
