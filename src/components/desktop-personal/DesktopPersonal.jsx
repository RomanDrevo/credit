import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {inject, observer} from 'mobx-react';
import {Col, Grid, Row} from 'react-bootstrap';
import styles from './DesktopPersonal.module.scss';
// import AuthCard from './components/auth/AuthCard';
import Title from '../common/horizontal-list/Title';



@withRouter
@inject('homeUiState', 'categoriesStore', 'benefitsStore', 'businessesStore', 'promotionsStore')
@observer
export default class DesktopPersonal extends Component {
    render(){
        return(
            <div>x</div>
        )
    }
}
