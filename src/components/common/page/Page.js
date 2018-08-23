import React from 'react';
import Header from "../../header/Header";
import BottomBar from "../bottombar/BottomBar";
import './Page.scss';
import ResponsiveComponent from '../../../framework/components/ResponsiveComponent';
import DesktopHeader from "../../desktop-header/DesktopHeader";
import * as classnames from "classnames";
import FooterDesktop from '../footerdesktop/FooterDesktop';

export default class Page extends ResponsiveComponent {

    renderDesktop() {
        const { className } = this.props;

        return (
            <div className={classnames("desktop-page", className)}>
                <DesktopHeader />

                {this.props.children}

                <FooterDesktop/>
            </div>
        )
    }

    renderMobile() {
        const { title, className, customHeader, customBottomBar } = this.props;
        return (
            <div className={className}>
                {customHeader ? customHeader : <Header title={title}/>}
                {this.props.children}

                {customBottomBar !== null ? (customBottomBar ? customBottomBar : <BottomBar/>) : null}
            </div>
        )
    }


}
