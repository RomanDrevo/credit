import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import styles from '../header/Header.module.scss';
import {Link} from 'react-router-dom';

export default class Header extends Component {
    render() {
        const {benefitName} = this.props;
        return (
            <header className={`${styles.header} full-height`}>
                <Navbar fixedTop inverse collapseOnSelect className={`${styles.navbar} full-height`}>
                    <Navbar.Header className="flex items-center full-height">
                        <div className="text-center flex-auto header-title pull-right mr4">
                            {benefitName}
                        </div>

                        <Navbar.Brand className="flex">
                            <Link to="/">
                                <img alt="logo" src={require('../../assets/images/icon-home.svg')}
                                     className="home "/>
                            </Link>
                            <Link to="/">
                                <img alt="logo" src={require('../../assets/images/icon-personal.svg')}
                                     className="personal mr2"/>
                            </Link>
                            <Link to="/">
                                <img alt="logo" src={require('../../assets/images/logo.svg')}
                                     className="logo-isracard mr2"/>
                            </Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </header>
        );
    }
}
