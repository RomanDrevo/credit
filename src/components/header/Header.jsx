import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Navbar } from "react-bootstrap";
import styles from "./Header.module.scss";
import * as classnames from "classnames";
import { withRouter } from "react-router-dom";
import Search from "../search/Search";
import SearchBar from "../search/SearchBar";
import SearchIcon from "../../assets/images/search.svg";
import SlidingMenu from "./menu/SlidingMenu";

@withRouter
@inject('searchedBenefitsStore', 'searchUiState')
@observer
export default class Header extends Component {
    state = {
        isMenuOpen: false,
        isTop: true,
    };

    componentDidMount() {
        window.addEventListener('scroll', this._onWindowScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this._onWindowScroll.bind(this));
    }

    _onWindowScroll() {
        const isTop = window.scrollY < 100;
        if (isTop !== this.state.isTop) {
            this.setState({ isTop })
        }
    }

    render() {
        const { searchUiState, history } = this.props;
        const className = this.state.isTop ? styles.navbar : classnames(styles.navbar, 'is-not-top');
        return (
            <header className={styles.header}>
                <Navbar fixedTop inverse collapseOnSelect className={className}>
                    <Navbar.Header className="flex items-center pt1">
                        <div onClick={() => searchUiState.closeShowSearchPage()} className="position-relative">
                            <SlidingMenu history={history}
                                         isOpen={this.state.isMenuOpen}
                                         onToggled={(isOpen) => this.setState({ isMenuOpen: isOpen })}/>
                        </div>


                        {

                            !searchUiState.isSearching ?
                            <div className="text-center flex-auto header-title pull-right mr4">
                                <span className={!this.state.isTop ? 'invisible' : ''}>{this.props.title}</span>
                            </div> : null
                        }


                        {
                            searchUiState.isSearching ?
                            <div>
                                <SearchBar/>

                                <Search/>
                            </div> :
                            <div className="flex justify-end">
                                <a className="navbar-search">
                                    <img alt="search" className="search-icon" src={SearchIcon}
                                         onClick={() => searchUiState.toggleIsSearching()}/>
                                </a>
                            </div>
                        }

                        <Navbar.Brand>
                            <a href="" onClick={(e) => {
                                e.preventDefault();
                                history.push("/")
                            }} target="_blank" rel="noopener noreferrer">
                                <img alt="logo" src={require('../../assets/images/logo.svg')} className="logo"/>
                            </a>
                        </Navbar.Brand>
                    </Navbar.Header>
                </Navbar>
            </header>
        );
    }
}
