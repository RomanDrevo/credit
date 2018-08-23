import React, {Component} from 'react';
import * as classnames from 'classnames';
import appUiState, {DeviceType} from "../../components/appUiState";


export default class ResponsiveComponent extends Component {
    constructor(props) {
        super(props);
        if (this.renderCommon) {
            if (this.renderMobile || this.renderDesktop) {
                throw new Error('Cannot define both renderCommon and renderMobile/renderDesktop')
            }
        }
        else {
            if (!this.renderMobile && !this.renderDesktop) {
                throw new Error('renderCommon or renderMobile/renderDesktop not defined')
            }
        }
    }

    componentWillMount() {
    }

    componentWillUnmount() {
    }

    desktopContext() {
        return {}
    }

    mobileContext() {
        return {};
    }

    _addDeviceClass(child) {
        return React.cloneElement(child, {
            className: classnames(
                child.props.className,
                {
                    desktop: appUiState.deviceType === DeviceType.DESKTOP,
                    mobile: appUiState.deviceType === DeviceType.MOBILE,
                    tablet: appUiState.deviceType === DeviceType.TABLET
                }
            )
        });
    }

    render() {
        let component;
        const isMobile = appUiState.deviceType === DeviceType.MOBILE;
        if (this.renderCommon) {
            component = this.renderCommon(isMobile ? this.mobileContext() : this.desktopContext());
        }

        else if (isMobile && this.renderMobile) {
            component = this.renderMobile();
        }
        else {
            component = this.renderDesktop();
        }

        return this._addDeviceClass(component);
    }
}
