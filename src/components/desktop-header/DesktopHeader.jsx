import React, {Component} from 'react';
import {Nav, Navbar, NavItem} from 'react-bootstrap';
import styles from "./DesktopHeader.module.scss";
import {withRouter} from "react-router-dom";
import SearchBar from "../search/SearchBar";
import {inject, observer} from 'mobx-react';
import Search from "../search/Search";


@withRouter
@inject('categoriesStore')
@observer
class DesktopCategoryList extends Component {
    render() {
        const {categoriesStore: {categories}, history} = this.props;
        return (
            <div className="category-list-wrapper">
                <Navbar>
                    <div className="flex justify-center">
                        <Nav>
                            {categories.map(x =>
                                                <NavItem key={x.id}
                                                         onClick={() => history.push(`/category-benefits/${x.id}`)}>
                                                    {x.name}
                                                </NavItem>
                            )}
                        </Nav>
                    </div>
                </Navbar>
            </div>
        );
    }
}

@withRouter
@inject('searchedBenefitsStore', 'searchUiState')
@observer
class DesktopHeader extends Component {
    render() {
        const {searchUiState, history} = this.props;

        return (
            <div className={styles.header}>
                <Navbar fluid className="desktop-header-wrapper">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="" onClick={(e) => {
                                e.preventDefault();
                                history.push("/")
                            }}><img alt="isracard-logo"
                                    src={require('../../assets/images/logos/desktop-logo.png')}/></a>
                        </Navbar.Brand>
                    </Navbar.Header>

                    <Nav>
                        <NavItem onClick={() => {history.push("/"); searchUiState.closeShowSearchPage()}}>דף הבית</NavItem>
                        <NavItem onClick={() => {history.push("/favorites"); searchUiState.closeShowSearchPage()}}>מועדפים</NavItem>
                        <NavItem onClick={() => {history.push("/category-benefits/1"); searchUiState.closeShowSearchPage()}}>קטגוריות</NavItem>
                        <NavItem onClick={() => {history.push("/contact-us"); searchUiState.closeShowSearchPage()}}>צור קשר</NavItem>
                        <NavItem>
                            <SearchBar/>
                        </NavItem>
                    </Nav>

                    <Nav pullLeft className="login-register">
                        <NavItem onClick={() => {history.push("/registration"); searchUiState.closeShowSearchPage()}}>
                            <img alt="userpic" src={require('../../assets/images/user-desktop.png')}/>
                            <span>הרשמה/התחברות</span>
                        </NavItem>
                    </Nav>
                </Navbar>
                {
                    searchUiState.isSearching ?
                    <Search/> : null
                }

                <DesktopCategoryList/>
            </div>


        )
    }
}

export default DesktopHeader;
