import React from 'react';
import styles from './AuthCard.module.scss';
import ActionButton from '../../../common/actionbutton/ActionButton';
import {withRouter} from "react-router-dom";


const AuthCard = ({history}) => {
    return (
        <div className={`${styles['login-panel']}`}>
            <div className="user-requirement-message mx3">
                <p className="mx-auto text-center">
                    כדי לראות את ההטבות שברשותך עליך להיות מחובר
                </p>
            </div>

            <div className="flex justify-center items-center actions">
                <ActionButton className="signin-button" onClick={() => history.push('/login')}>התחבר</ActionButton>
            </div>
        </div>);

};

export default withRouter(AuthCard);
