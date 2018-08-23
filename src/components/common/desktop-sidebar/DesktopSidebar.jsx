import React, {Component} from "react";
import {Link} from "react-router-dom";
// import * as match from "mobx-react-form";
import styles from "./DesktopSidebar.module.scss";


class DesktopSidebar extends Component{
    render(){

        const {match} = this.props;


        return(
            <ul className={styles['links-container']}>
                <Link to="/faq">
                    <li className={match.path === "/faq" ? "active-link" : ""}>שאלות נפוצות</li>
                </Link>
                <a>
                    <li>תקנון</li>
                </a>
                <Link to="/contact-us" >
                    <li className={match.path === "/contact-us" ? "active-link" : ""}>צור קשר</li>
                </Link>
            </ul>
        )
    }
}

export default DesktopSidebar;
